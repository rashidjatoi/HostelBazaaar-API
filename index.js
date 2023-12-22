const express = require("express");
const app = express();
const mongoose = require("./src/config/db")
require('dotenv').config();

// Import Models
const newsletterRouter = require("./src/router/newsletter_route");
const authRouter = require("./src/router/auth_route");

// Middleware
app.use(express.json());
app.use(newsletterRouter);
app.use(authRouter)


const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "Server Working",
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log("Connected at PORT: " + PORT);
});
