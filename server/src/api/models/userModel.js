const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other user fields as necessary
    gameRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "GameRooms", // Must match the table name for GameRoom
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true, // Add createdAt and updatedAt automatically
  }
);

module.exports = User;
