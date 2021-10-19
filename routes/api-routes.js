// Configuration
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Controllers
const { login, register, logout } = require("../controllers/auth-controller");
const { updateZip, getData } = require("../controllers/user-controller");
const { getWeather } = require("../controllers/weather-controller");

// Login route
// Route: http://localhost:3000/api/login
// Type: POST

router.post("/api/login", passport.authenticate("local"), login);

// Signup route
// Route: http://localhost:3000/api/register
// Type: POST

router.post("/api/register", register);

// Logout route
// Route: http://localhost:3000/logout
// Type: GET

router.get("/logout", logout);

// Update Zip route
// Route: http://localhost:3000/logout
// Type: POST

router.post("/api/zip", updateZip);

// Get user info
// Route: http://localhost:3000/api/dashboard
// Type: GET

router.get("/api/dashboard", getData);

// Get weather info
// Route: http://localhost:3000/api/weather
// TYPE: GET

router.get("/api/weather", getWeather);

module.exports = router;
