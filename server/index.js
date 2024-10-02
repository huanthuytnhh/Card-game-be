// // server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// const rooms = {};

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("join_room", (roomName) => {
//     socket.join(roomName);
//     console.log(`Socket ${socket.id} joined room ${roomName}`);

//     if (!rooms[roomName]) {
//       rooms[roomName] = {
//         players: [],
//         gameStarted: false,
//         gameState: null,
//       };
//     }

//     rooms[roomName].players.push({
//       id: socket.id,
//       hand: [],
//       movedCards: [],
//       avatar: null,
//     });

//     io.in(roomName).emit("update_players", rooms[roomName].players);

//     if (rooms[roomName].players.length === 4 && !rooms[roomName].gameStarted) {
//       startGame(roomName);
//     }
//   });

//   socket.on("player_move", (data) => {
//     const { roomName, selectedCards } = data;
//     const room = rooms[roomName];
//     if (!room) return;

//     const currentPlayer = room.players.find(
//       (player) => player.id === socket.id
//     );
//     currentPlayer.hand = currentPlayer.hand.filter(
//       (card) => !selectedCards.some((selCard) => selCard.id === card.id)
//     );
//     currentPlayer.movedCards.push(...selectedCards);

//     room.gameState.currentPlayerIndex =
//       (room.gameState.currentPlayerIndex + 1) % room.players.length;

//     io.in(roomName).emit("update_game_state", {
//       gameState: room.gameState,
//       players: room.players,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     for (const roomName in rooms) {
//       const room = rooms[roomName];
//       room.players = room.players.filter((player) => player.id !== socket.id);

//       if (room.players.length === 0) {
//         delete rooms[roomName];
//       } else {
//         io.in(roomName).emit("update_players", room.players);
//       }
//     }
//   });
// });

// function startGame(roomName) {
//   const room = rooms[roomName];
//   room.gameStarted = true;

//   const deck = generateDeck();
//   shuffleDeck(deck);

//   const hands = dealCards(deck, room.players.length);
//   room.players.forEach((player, index) => {
//     player.hand = hands[index];
//     io.to(player.id).emit("game_started", {
//       hand: player.hand,
//       players: room.players,
//     });
//   });

//   room.gameState = {
//     currentPlayerIndex: 0,
//     countdown: 15,
//   };

//   io.in(roomName).emit("update_game_state", {
//     gameState: room.gameState,
//   });
// }

// function generateDeck() {
//   const suits = ["spades", "hearts", "diamonds", "clubs"];
//   const values = [
//     "Ace",
//     "King",
//     "Queen",
//     "Jack",
//     "10",
//     "9",
//     "8",
//     "7",
//     "6",
//     "5",
//     "4",
//     "3",
//     "2",
//   ];

//   const deck = [];
//   for (let suit of suits) {
//     for (let value of values) {
//       deck.push({ id: `${value} of ${suit}`, value: value, suit: suit });
//     }
//   }
//   return deck;
// }

// function shuffleDeck(deck) {
//   deck.sort(() => Math.random() - 0.5);
// }

// function dealCards(deck, numberOfPlayers) {
//   const hands = [];
//   const cardsPerPlayer = Math.floor(deck.length / numberOfPlayers);
//   for (let i = 0; i < numberOfPlayers; i++) {
//     hands.push(deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer));
//   }
//   return hands;
// }

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/api/routes/userRoutes");
const gameRoomRoutes = require("./src/api/routes/gameRoomRoutes");
const sequelize = require("./src/config/database"); // Kết nối đến cơ sở dữ liệu

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Sử dụng routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/gameroom", gameRoomRoutes);

const { User, GameRoom } = require("./src/api/models");

// Đồng bộ hóa cơ sở dữ liệu
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Tạo lại bảng
    console.log("Đã đồng bộ hóa với cơ sở dữ liệu.");
  } catch (error) {
    console.error("Lỗi đồng bộ hóa:", error);
  }
};

// Khởi động server và đồng bộ hóa
const startServer = async () => {
  await syncDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
