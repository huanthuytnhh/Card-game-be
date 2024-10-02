// src/api/routes/gameRoomRoutes.js
const express = require("express");
const router = express.Router();
const gameRoomController = require("../controllers/gameRoomController");

// Định nghĩa route cho GET gamerooms
router.get("/", gameRoomController.getGameRooms); // Xử lý GET /api/v1/gameroom
router.post("/", gameRoomController.createGameRoom); // Xử lý POST /api/v1/gameroom
router.post("/join", gameRoomController.joinGameRoom);
// Có thể thêm các route khác như GET theo ID, cập nhật và xóa
router.get("/:id", gameRoomController.getGameRoomById);
router.put("/:id", gameRoomController.updateGameRoom);
router.delete("/:id", gameRoomController.deleteGameRoom);
router.get("/:id/players", gameRoomController.getPlayersInRoom);
module.exports = router;
