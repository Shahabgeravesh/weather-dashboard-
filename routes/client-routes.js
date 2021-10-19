const express = require("express");
const router = express.Router();
const isAuthenticated = require("../config/middleware/isAuthenticated");
const path = require("path");

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../client/splash.html"));
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dashboard.html"));
});

module.exports = router;
