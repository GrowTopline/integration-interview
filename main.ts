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

  res.send(uri);
});

// Route to get all todos
app.get('/todo', async (_: Request, res: Response) => {
  const result = await db.query(sql`SELECT * from todo`);
  res.send(result);
});

// Route to create a todo
app.post('/todo', async (req: Request, res: Response) => {
  const result = await db.query(
    sql`INSERT INTO todo (label) VALUES (${req.body.label}) RETURNING *`
  );
  res.send(result);
});

// Route to toggle the 'done' state of a todo
app.put('/todo/:todo_id', async (req: Request, res: Response) => {
  const result = await db.query(
    sql`UPDATE todo SET done = NOT done WHERE todo_id = ${req.params.todo_id} RETURNING *`
  );
  res.send(result);
});

app.listen(8080, async () => {
  await dbInit();
  console.log('Server is running at http://localhost:8080');
});
