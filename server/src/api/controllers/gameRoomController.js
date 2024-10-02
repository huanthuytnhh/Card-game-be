// src/api/controllers/gameRoomController.js
const gameRoomService = require("../services/gameRoomService");
const GameRoom = require("../models/gameRoomModel");
const User = require("../models/userModel");
// Tạo phòng game mới
const createGameRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const newGameRoom = await gameRoomService.createRoom(name);
    res.status(201).json(newGameRoom);
  } catch (error) {
    res.status(500).json({ error: "Không thể tạo phòng game." });
  }
};

// Lấy danh sách phòng game
const getGameRooms = async (req, res) => {
  try {
    const gameRooms = await gameRoomService.getAllRooms();
    res.status(200).json(gameRooms);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách phòng game." });
  }
};

// Lấy thông tin phòng game theo ID
const getGameRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const gameRoom = await gameRoomService.getRoomById(id);
    res.status(200).json(gameRoom);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cập nhật thông tin phòng game
const updateGameRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRoom = await gameRoomService.updateRoom(id, name);
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật phòng game." });
  }
};

// Xóa phòng game
const deleteGameRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await gameRoomService.deleteRoom(id);
    res.status(204).send(); // Gửi lại mã trạng thái 204 không có nội dung
  } catch (error) {
    res.status(500).json({ error: "Không thể xóa phòng game." });
  }
};

// Tham gia phòng game
// Tham gia phòng game
const joinGameRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    console.log("Room ID:", roomId);
    console.log("User ID:", userId);

    const gameRoom = await gameRoomService.getRoomById(roomId);
    if (!gameRoom) {
      console.log("Phòng game không tồn tại.");
      return res.status(404).json({ error: "Phòng game không tồn tại." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      console.log("Người dùng không tồn tại.");
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }

    if (user.gameRoomId) {
      console.log("Người chơi đã tham gia một phòng khác.");
      return res
        .status(400)
        .json({ error: "Người chơi đã tham gia một phòng khác." });
    }

    // Assign gameRoomId to user
    user.gameRoomId = roomId;
    await user.save();

    console.log("Tham gia phòng game thành công.");
    res.status(200).json({ message: "Tham gia phòng game thành công." });
  } catch (error) {
    console.error("Lỗi khi tham gia phòng game:", error);
    res.status(500).json({ error: "Không thể tham gia phòng game." });
  }
};

// // Lấy danh sách người chơi trong phòng
// const getPlayersInRoom = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const players = await gameRoomService.getPlayersInRoom(id);
//     res.status(200).json(players);
//   } catch (error) {
//     res.status(500).json({ error: "Không thể lấy danh sách người chơi." });
//   }
// };
// Lấy danh sách người chơi trong phòng game theo ID
const getPlayersInRoom = async (req, res) => {
  try {
    const gameRoomId = req.params.id; // Lấy gameRoomId từ URL params

    // Tìm tất cả người chơi trong phòng
    const users = await User.findAll({
      where: { gameRoomId },
    });

    // Nếu không có người chơi nào trong phòng
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có người chơi nào trong phòng." });
    }

    // Trả về danh sách người chơi
    res.status(200).json({ players: users });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người chơi:", error);
    res.status(500).json({ error: "Không thể lấy danh sách người chơi." });
  }
};

module.exports = {
  createGameRoom,
  getGameRooms,
  getGameRoomById,
  updateGameRoom,
  deleteGameRoom,
  joinGameRoom,
  getPlayersInRoom,
};
