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
    database: 'database',
    user: 'postgres',
    password: '05101996',
};
const app = express();
app.use((0, cors_1.default)());
app.use(express.json());
const pgp = pgPromise({});
const db = pgp(connection);
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield db.any('SELECT * FROM users');
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
        const data = yield db.one('SELECT * FROM users WHERE id = $1', id);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.post('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, middle_name, last_name, email, phone_number, role, address } = req.body;
        const data = yield db.one('INSERT INTO users (first_name, middle_name, last_name, email, phone_number, role, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [first_name, middle_name, last_name, email, phone_number, role, address]);
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
        const { first_name, middle_name, last_name, email, phone_number, role, address } = req.body;
        const data = yield db.one('UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5, role = $6, address = $7 WHERE id = $8 RETURNING *', [first_name, middle_name, last_name, email, phone_number, role, address, id]);
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
