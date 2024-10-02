const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./userModel");

const GameRoom = sequelize.define("GameRoom", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Define the one-to-many relationship
GameRoom.hasMany(User, { foreignKey: "gameRoomId" });
User.belongsTo(GameRoom, { foreignKey: "gameRoomId" });

module.exports = GameRoom;
