// src/api/services/gameRoomService.js
const GameRoom = require("../models/gameRoomModel");
const User = require("../models/userModel");

const gameRoomService = {
  createRoom: async (name) => {
    const newGameRoom = await GameRoom.create({ name });
    return newGameRoom;
  },

  joinRoom: async (roomId, userId) => {
    const gameRoom = await GameRoom.findByPk(roomId);
    if (!gameRoom) throw new Error("Phòng game không tồn tại.");
    await gameRoom.addUser(userId);
    return gameRoom;
  },

  getRoomById: async (roomId) => {
    const gameRoom = await GameRoom.findByPk(roomId);
    if (!gameRoom) throw new Error("Phòng game không tồn tại.");
    return gameRoom;
  },

  getAllRooms: async () => {
    return await GameRoom.findAll();
  },

  updateRoom: async (roomId, name) => {
    const gameRoom = await gameRoomService.getRoomById(roomId); // Sử dụng hàm getRoomById để kiểm tra
    await gameRoom.update({ name });
    return gameRoom;
  },

  deleteRoom: async (roomId) => {
    const gameRoom = await gameRoomService.getRoomById(roomId);
    await gameRoom.destroy();
  },

  //   getPlayersInRoom: async (roomId) => {
  //     const gameRoom = await GameRoom.findByPk(roomId, {
  //       include: "Users",
  //     });
  //     return gameRoom.Users; // Không cần kiểm tra vì đã được xử lý ở hàm getRoomById
  //   },
  getPlayersInRoom: async (roomId) => {
    // Giả sử bạn có bảng UserGameRoom lưu thông tin người chơi trong phòng
    const players = await User.findAll({
      include: [
        {
          model: GameRoom, // Thay đổi thành model tương ứng với bảng GameRoom của bạn
          where: { id: roomId },
          through: { attributes: [] }, // Nếu bạn sử dụng bảng trung gian, có thể không cần thuộc tính này
        },
      ],
    });
    return players; // Trả về danh sách người chơi
  },
};

module.exports = gameRoomService;
