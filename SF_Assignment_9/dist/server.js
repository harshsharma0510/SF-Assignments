"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const pgPromise = require("pg-promise");
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'postgres',
    password: 'postgres',
};
const app = express();
app.use((0, cors_1.default)());
app.use(express.json());
const pgp = pgPromise({});
const db = pgp(connection);
app.get('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.any('SELECT * FROM customers');
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.get('/api/roles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.any('SELECT * FROM roles');
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.any('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id');
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.get('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = yield db.one('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id WHERE u.id = $1', id);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address } = req.body;
        const data = yield db.one('INSERT INTO users (first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address]);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.put('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address } = req.body;
        const data = yield db.one('UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5,customer_id =$6, role_id = $7, address = $8 WHERE id = $9 RETURNING *', [first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address, id]);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.delete('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield db.none('DELETE FROM users WHERE id = $1', id);
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.connect();
    console.log("connected to db");
    console.log("server started on 3000");
}));
