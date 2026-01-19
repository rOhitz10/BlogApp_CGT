const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect:'postgres',
  port: 5433
});


const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    await sequelize.sync();
    console.log("Table created successfull!");
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connection();


module.exports = sequelize
