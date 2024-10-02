const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ensure these methods are correctly defined in userController
router.get("/", userController.getUsers); // Must be a function
router.post("/", userController.createUser); // Must be a function
router.get("/:id", userController.getUserById); // Must be a function
router.put("/:id", userController.updateUser); // Must be a function
router.delete("/:id", userController.deleteUser); // Must be a function

module.exports = router;
