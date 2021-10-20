const express = require("express");
const path = require('path');
const session = require("express-session");
const passport = require("./config/passport.js");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Configure express input / output
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client"));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));
}

// Configure session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      // Session will last for 1 hour
      maxAge: 3600000,
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up api routes
const apiRoutes = require("./routes/api-routes.js");
app.use(apiRoutes);

// Set up client routes
const clientRoutes = require("./routes/client-routes");
app.use(clientRoutes);

// sync with database and serve content
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening at: http://localhost:${PORT}`));
});
