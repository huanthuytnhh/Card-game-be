const { Sequelize } = require("sequelize");

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize("cardgame", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

module.exports = sequelize;
