// UserGameRoom model
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserGameRoom = sequelize.define(
  "UserGameRoom",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    gameRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "GameRooms",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "UserGameRooms", // Tùy chỉnh tên bảng nếu cần
  },
  {
    timestamps: false,
  }
);

module.exports = UserGameRoom;
