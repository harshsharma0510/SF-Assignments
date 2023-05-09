import { User, UserRole } from './user.model';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '..', 'data', 'users.json');

export class UserService {
  getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const parsedData = JSON.parse(data) as User[];
          resolve(JSON.parse(data));
        }
      });
    });
  }

  createUser(user: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.getUsers();
        users.push(user);
        fs.writeFile(dataFilePath, JSON.stringify(users), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  updateUser(updatedUser: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.getUsers();
        const index = users.findIndex(
          (user) => user.email === updatedUser.email
        );

        if (index !== -1) {
          users[index] = updatedUser;
          fs.writeFile(dataFilePath, JSON.stringify(users), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject(new Error('User not found'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteUser(email: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await this.getUsers();
        const updatedUsers = users.filter((user) => user.email !== email);

        if (updatedUsers.length !== users.length) {
          fs.writeFile(dataFilePath, JSON.stringify(updatedUsers), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject(new Error('User not found'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
