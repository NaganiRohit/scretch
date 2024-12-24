const express = require("express");
const router = express.Router();
const users = require("../models/user-model");
const { registerUser, loginUser } = require("../controllers/authControler");
const isLoggedin = require("../middlewares/isLoggedin");

// Route for base users endpoint
router.get("/", (req, res) => {
    res.send("users");
});

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for user logout
router.get("/logout", isLoggedin, async (req, res) => {
    try {
        // Clear the authentication token
        res.cookie("token", "");

        // Redirect to the homepage
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
