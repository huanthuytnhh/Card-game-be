// src/api/controllers/userController.js
const userService = require("../services/userService"); // Import userService

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Gọi phương thức từ userService
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id); // Gọi phương thức từ userService
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Tạo người dùng mới
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Lấy thông tin từ body
    const newUser = await userService.createUser({ name, email, password }); // Gọi phương thức từ userService
    res.status(201).json(newUser); // Đảm bảo trả về đối tượng người dùng
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body); // Gọi phương thức từ userService
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id); // Gọi phương thức từ userService
    if (deletedUser) {
      res.status(204).send(); // Trả về mã 204 No Content
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
