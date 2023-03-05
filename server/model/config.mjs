import {Sequelize} from 'sequelize'
const sequelize = new Sequelize({
    username:'postgres',
    password:'123larisa123',
    dialect: 'postgres',
    host: 'localhost',
    database:'OrderSystem',
    port: 1111,
    logging: false,
    define: {
        timestamps: true,
        freezeTableName: true
    }
  });
export default sequelize