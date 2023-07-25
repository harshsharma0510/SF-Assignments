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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const model_1 = require("./model");
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'newdb',
    user: 'postgres',
    password: '05101996',
};
const sequelize = new sequelize_1.Sequelize(connection.database, connection.user, connection.password, {
    host: connection.host,
    port: connection.port,
    dialect: 'postgres',
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define your routes here
app.get('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.Customer.findAll();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.get('/api/roles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.Role.findAll();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model_1.User.findAll({
            include: [model_1.Customer, model_1.Role],
        });
        console.log(data);
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
        const newUser = yield model_1.User.create({
            first_name,
            middle_name,
            last_name,
            email,
            phone_number,
            customer_id,
            role_id,
            address,
        });
        res.json(newUser);
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
        const user = yield model_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.first_name = first_name;
        user.middle_name = middle_name;
        user.last_name = last_name;
        user.email = email;
        user.phone_number = phone_number;
        user.customer_id = customer_id;
        user.role_id = role_id;
        user.address = address;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
app.delete('/api/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield model_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield user.destroy();
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}));
sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to the database successfully.');
    try {
        const customers = yield model_1.Customer.findAll();
        const roles = yield model_1.Role.findAll();
        const users = yield model_1.User.findAll({
            include: [model_1.Customer, model_1.Role],
        });
    }
    catch (error) {
        console.error('Error fetching data from the database:', error);
    }
    app.listen(3000, () => {
        console.log('Server started on port 3000.');
    });
}))
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
