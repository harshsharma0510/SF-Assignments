import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { UserService } from './user.service';
import { User, UserRole } from './user.model';

const app = express();
const userService = new UserService();
app.use(cors());

app.use(bodyParser.json());

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await userService.getUsers();
    console.log('Retrieved users:', users); 
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving users' });
  }
});

// Create a new user
app.post('/api/users', (req, res) => {
  const user = new User(
    req.body.firstName,
    req.body.middleName,
    req.body.lastName,
    req.body.email,
    req.body.phoneNumber,
    UserRole[req.body.role as keyof typeof UserRole],
    req.body.address
  );

  userService
    .createUser(user)
    .then(() => res.status(201).send({ message: 'User created successfully' }))
    .catch((err) => res.status(500).send({ message: 'Error creating user' }));
});

// Update an existing user
app.put('/api/users', (req, res) => {
  const user = new User(
    req.body.firstName,
    req.body.middleName,
    req.body.lastName,
    req.body.email,
    req.body.phoneNumber,
    UserRole[req.body.role as keyof typeof UserRole],
    req.body.address
  );

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
