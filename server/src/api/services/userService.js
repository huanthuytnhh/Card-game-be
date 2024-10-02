const User = require("../models/userModel");

// Lấy tất cả người dùng
const getAllUsers = async () => {
  return await User.findAll();
};

// Lấy người dùng theo ID
const getUserById = async (id) => {
  return await User.findByPk(id);
};

// Tạo người dùng mới
const createUser = async (userData) => {
  return await User.create(userData);
};

// Cập nhật người dùng
const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(userData);
  }
  return null;
};

// Xóa người dùng
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
