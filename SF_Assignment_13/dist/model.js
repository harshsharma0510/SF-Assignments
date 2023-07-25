"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = exports.Customer = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('newdb', 'postgres', '05101996', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
exports.sequelize = sequelize;
class Customer extends sequelize_1.Model {
}
exports.Customer = Customer;
Customer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'customers',
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat',
});
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'roles',
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat',
});
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    middle_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
User.belongsTo(Customer, { foreignKey: 'customer_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });
sequelize.sync({ force: false }).then(() => {
    console.log('Database tables synced successfully.');
}).catch((error) => {
    console.error('Unable to sync database tables:', error);
});
