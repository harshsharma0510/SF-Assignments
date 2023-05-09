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
exports.UserService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, '..', 'data', 'users.json');
class UserService {
    getUsers() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(dataFilePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    const parsedData = JSON.parse(data);
                    resolve(JSON.parse(data));
                }
            });
        });
    }
    createUser(user) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getUsers();
                users.push(user);
                fs_1.default.writeFile(dataFilePath, JSON.stringify(users), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            catch (err) {
                reject(err);
            }
        }));
    }
    updateUser(updatedUser) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getUsers();
                const index = users.findIndex((user) => user.email === updatedUser.email);
                if (index !== -1) {
                    users[index] = updatedUser;
                    fs_1.default.writeFile(dataFilePath, JSON.stringify(users), (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
                else {
                    reject(new Error('User not found'));
                }
            }
            catch (err) {
                reject(err);
            }
        }));
    }
    deleteUser(email) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getUsers();
                const updatedUsers = users.filter((user) => user.email !== email);
                if (updatedUsers.length !== users.length) {
                    fs_1.default.writeFile(dataFilePath, JSON.stringify(updatedUsers), (err) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
                else {
                    reject(new Error('User not found'));
                }
            }
            catch (err) {
                reject(err);
            }
        }));
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map