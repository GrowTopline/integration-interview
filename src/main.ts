import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import OAuthClient from 'intuit-oauth';
import { intuitOauthClient } from './intuit';
import { dbInit } from './db';

const app: Express = express();

// Set up middlewear
app.use(cors()); // Allows queries to come from url's not served by this app
app.use(express.json()); // Automatically parses requests with content-type: application/json
app.use(express.static('public')); // Serves files in the /static directory

// Route to get an Intuit OAuth URI
app.get('/intuit-oauth-uri', async (_: Request, res: Response) => {
  const uri = intuitOauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
  });

  res.redirect(uri);
});

// Route to get an Intuit OAuth URI
app.get('/integration-callback', async (_: Request, res: Response) => {
  console.log('Getting a token');
  res.redirect('/index.html');
});

// Route to get all todos
app.get('/', async (_: Request, res: Response) => {
  res.redirect('/index.html');
});

app.listen(8080, async () => {
  await dbInit();
  console.log('Server is running at http://localhost:8080');
});
