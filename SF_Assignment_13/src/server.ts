import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import { Customer, Role, User } from './model';

const connection: any = {
  host: 'localhost',
  port: 5432,
  database: 'newdb',
  user: 'postgres',
  password: '05101996',
};

const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
  host: connection.host,
  port: connection.port,
  dialect: 'postgres',
});

const app = express();
app.use(cors());
app.use(express.json());

// Define your routes here
app.get('/api/customers', async (req, res) => {
  try {
    const data = await Customer.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/roles', async (req, res) => {
  try {
    const data = await Role.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const data = await User.findAll({
      include: [Customer, Role],
    });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address } = req.body;
    const newUser = await User.create({
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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address } = req.body;

    const user = await User.findByPk(id);
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

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
sequelize
  .authenticate()
  .then(async () => {
    console.log('Connected to the database successfully.');

    try {
      const customers = await Customer.findAll();


      const roles = await Role.findAll();
      

      const users = await User.findAll({
        include: [Customer, Role],
      });
      
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }

   
    app.listen(3000, () => {
      console.log('Server started on port 3000.');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

