import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import OAuthClient from 'intuit-oauth';
import { intuitOauthClient } from './intuit';
import { db, dbInit } from './db';
import { sql } from '@databases/sqlite';

const app: Express = express();

// Set up middlewear
app.use(express.json()); // Automatically parses requests with content-type: application/json
app.use(express.static('public')); // Serves files in the /static directory

// Route to initialize intuit oauth flow
app.get('/intuit-oauth-uri', async (_: Request, res: Response) => {
  // Create a URI to initialize the intuit auth flow
  const uri = intuitOauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
  });

  // Store the state generated by intuit to check during the callback
  const url = new URL(uri);
  const state = url.searchParams.get('state');
  db.query(sql`INSERT INTO oauth_states (state) VALUES (${state});`);

  // Send the user to the created URI
  res.redirect(uri);
});

// Callback route from intuit oauth flow
app.get('/integration-callback', async (req: Request, res: Response) => {
  // Check if state exists before getting tokens. Why is this important?
  const [, query] = req.url.split('?');
  const searchParams = new URLSearchParams(query);
  const state = searchParams.get('state');
  const stateCheck = await db.query(
    sql`SELECT * FROM oauth_states WHERE state = ${state};`
  );
  if (!stateCheck.length) {
    return res.status(404).send('State not found');
  }

  // Get auth tokens from Intuit using their API
  const authResponse = await intuitOauthClient.createToken(req.url);
  const authToken = authResponse.getToken();

  // TODO: store the tokens in the DB
  console.log('Store token in part 2 here', authToken);

  // Send the user to a "success" page
  res.redirect('/success.html');
});

// Route to refresh the tokens (part 2)
app.get('/refresh-tokens', async (req: Request, res: Response) => {
  // Add code here in Part 2 to refresh the tokens
  res.status(501).send('Not implemented');
});

// Route to get company info (part 3)
app.get('/company-info', async (req: Request, res: Response) => {
  // Add code here in Part 3 to get company info
  res.status(501).send('Not implemented');
});

// Route to redirect all undefined routes to index.html
app.get('*', (_: Request, res: Response) => {
  res.redirect('/index.html');
});

// Spin up the server
app.listen(8080, async () => {
  // Initialize the db
  await dbInit();
  console.log('Server is running at http://localhost:8080');
});
