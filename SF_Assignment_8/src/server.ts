import express = require('express');
import cors from 'cors';
import { Request, Response } from 'express';
import { IDatabase, IMain } from 'pg-promise';
import pgPromise = require('pg-promise');


const connection = {
  host: 'localhost',
  port: 5432,
  database: 'database',
  user: 'postgres',
  password: 'postgres',
};


const app = express();


app.use(cors());


app.use(express.json());


const pgp: IMain = pgPromise({});
const db: IDatabase<any> = pgp(connection);


app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT * FROM users');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await db.one('SELECT * FROM users WHERE id = $1', id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { first_name, middle_name, last_name, email, phone_number, role, address } = req.body;
    const data = await db.one(
      'INSERT INTO users (first_name, middle_name, last_name, email, phone_number, role, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [first_name, middle_name, last_name, email, phone_number, role, address]
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { first_name, middle_name, last_name, email, phone_number, role, address } = req.body;
    const data = await db.one(
      'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5, role = $6, address = $7 WHERE id = $8 RETURNING *',
      [first_name, middle_name, last_name, email, phone_number, role, address, id]
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await db.none('DELETE FROM users WHERE id = $1', id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.listen(3000, async () => {

  await db.connect();
console.log("connected to db");
console.log("server started on 3000");
});
