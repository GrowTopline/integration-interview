import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import connect, { sql } from '@databases/sqlite';

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
app.use(cors());
app.use(express.json());

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
