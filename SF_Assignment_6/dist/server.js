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
const body_parser_1 = __importDefault(require("body-parser"));
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const app = (0, express_1.default)();
const userService = new user_service_1.UserService();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Get all users
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        console.log('Retrieved users:', users);
        res.json(users);
    }
    catch (err) {
        res.status(500).send({ message: 'Error retrieving users' });
    }
}));
// Create a new user
app.post('/api/users', (req, res) => {
    const user = new user_model_1.User(req.body.firstName, req.body.middleName, req.body.lastName, req.body.email, req.body.phoneNumber, user_model_1.UserRole[req.body.role], req.body.address);
    userService
        .createUser(user)
        .then(() => res.status(201).send({ message: 'User created successfully' }))
        .catch((err) => res.status(500).send({ message: 'Error creating user' }));
});
// Update an existing user
app.put('/api/users', (req, res) => {
    const user = new user_model_1.User(req.body.firstName, req.body.middleName, req.body.lastName, req.body.email, req.body.phoneNumber, user_model_1.UserRole[req.body.role], req.body.address);
    userService
        .updateUser(user)
        .then(() => res.send({ message: 'User updated successfully' }))
        .catch((err) => res.status(500).send({ message: 'Error updating user' }));
});
// Delete a user
app.delete('/api/users/:email', (req, res) => {
    const email = req.params.email;
    userService
        .deleteUser(email)
        .then(() => res.send({ message: 'User deleted successfully' }))
        .catch((err) => res.status(500).send({ message: 'Error deleting user' }));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map