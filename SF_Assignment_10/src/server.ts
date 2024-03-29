import express = require('express');
import cors from 'cors';
import { Request, Response } from 'express';
import { IDatabase, IMain } from 'pg-promise';
import pgPromise = require('pg-promise');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'mydatabase',
  user: 'postgres',
  password: '05101996',
};
const app = express();
app.use(cors());
app.use(express.json());
const pgp: IMain = pgPromise({});
const db: IDatabase<any> = pgp(connection);

app.get('/api/customers', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT * FROM customers');
    console.log(data); 
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get('/api/roles', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT * FROM roles');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const data = await db.any('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = await db.one('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id WHERE u.id = $1', id);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { first_name, middle_name, last_name, email, phone_number,customer_id, role_id, address } = req.body;
    const data = await db.one('INSERT INTO users (first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [first_name, middle_name, last_name, email, phone_number,customer_id, role_id, address]
    );
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { first_name, middle_name, last_name, email, phone_number, customer_id ,role_id, address } = req.body;
    const data = await db.one(
      'UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5,customer_id =$6, role_id = $7, address = $8 WHERE id = $9 RETURNING *',
      [first_name, middle_name, last_name, email, phone_number,customer_id,role_id, address, id]
    );
    console.log(data);
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
