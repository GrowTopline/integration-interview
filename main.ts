import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connect, { sql } from '@databases/sqlite';
import OAuthClient from 'intuit-oauth';

// Creates an in-memory SQLite DB. Note that this DB does not write to disk.
const db = connect();

async function dbInit() {
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS todo (
      todo_id INTEGER PRIMARY KEY,
      label VARCHAR NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
}

const app: Express = express();

// Set up middlewear
app.use(cors()); // Allows queries to come from url's not served by this app
app.use(express.json()); // Automatically parses requests with content-type: application/json
app.use(express.static('public')); // Serves files in the /static directory

// Route to get an Intuit OAuth URI
app.get('/intuit-oauth-uri', async (_: Request, res: Response) => {
  const uri = new OAuthClient({
    clientId: process.env.INTUIT_CLIENT_ID,
    clientSecret: process.env.INTUIT_CLIENT_SECRET,
    environment: process.env.INTUIT_ENVIRONMENT,
    redirectUri: process.env.INTUIT_REDIRECT_URI,
  }).authorizeUri({
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
