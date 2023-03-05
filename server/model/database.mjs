import { DataTypes } from "sequelize";
import sequelize from "./config.mjs";

const Client = sequelize.define('Client', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Informations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Socketid: {
    type: DataTypes.TEXT
  }
});

const Order = sequelize.define('Order', {
  OrderId: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  Value: {
    type: DataTypes.INTEGER
  },
  Details: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Status: {
    type: DataTypes.ENUM('stand_by', 'accept', 'done', 'reject'),
    defaultValue: 'stand_by'
  }
});

const Shop = sequelize.define('Shop', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Password: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Socketid: {
    type: DataTypes.TEXT
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define associations
Order.belongsTo(Shop);
Order.belongsTo(Client);
Shop.hasMany(Order);
Client.hasMany(Order);

sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

export {Client,Order,Shop}
