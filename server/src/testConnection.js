const sequelize = require("./config/database"); // Thay đổi đường dẫn cho phù hợp

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối đến cơ sở dữ liệu thành công.");
  } catch (error) {
    console.error("Không thể kết nối đến cơ sở dữ liệu:", error);
  }
};

testConnection();

// module.exports = testConnection;
