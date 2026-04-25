const User = require("../models/User");

// CREATE
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof age !== "number") {
      return res.status(400).json({ message: "Age must be a number" });
    }

    const user = await User.create({ name, email, age });
    res.status(201).json({ 
      message: "User created successfully", 
      user 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ 
      message: "Users fetched successfully", 
      users 
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// READ ONE
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "ID is required" });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ 
      message: "User fetched successfully", 
      user 
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!name && !email && !age) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ name, email, age });
    res.json({ 
      message: "User updated successfully", 
      user 
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ 
      message: "User deleted successfully", 
      user 
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};