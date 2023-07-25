import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';
const sequelize = new Sequelize('newdb', 'postgres', '05101996', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

interface CustomerAttributes {
  id: number;
  name: string;
  website?: string;
  address?: string;

}

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public id!: number;
  public name!: string;
  public website?: string;
  public address?: string;

}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'customers',
    timestamps: true, 
    createdAt: 'createdat', 
    updatedAt: 'updatedat', 
  }
);

interface RoleAttributes {
  id: number;
  name: string;
  key: string;
  description?: string;
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public key!: string;
  public description?: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'roles',
    timestamps: true, 
    createdAt: 'createdat', 
    updatedAt: 'updatedat', 
  }
);

interface UserAttributes {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone_number: string;
  address?: string;
  customer_id: number;
  role_id: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public first_name!: string;
  public middle_name?: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
  public address?: string;
  public customer_id!: number;
  public role_id!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
  }
);

User.belongsTo(Customer, { foreignKey: 'customer_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

sequelize.sync({ force: false }).then(() => {
    console.log('Database tables synced successfully.');
  }).catch((error) => {
    console.error('Unable to sync database tables:', error);
  });

export { sequelize, Customer, Role, User };
