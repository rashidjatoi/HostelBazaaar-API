const express = require("express");
const app = express();
const mongoose = require("./src/config/db");
require("dotenv").config();

// Import Models
const newsletterRouter = require("./src/router/newsletter_route");
const authRouter = require("./src/router/auth_route");
const hostelRouter = require("./src/router/hostel_route");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware
const baseUrl = "/api/v1";
app.use(express.json());
app.use(baseUrl, newsletterRouter);
app.use(baseUrl, authRouter);
app.use(baseUrl, hostelRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server Working",
    status: 200,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Connected at PORT: " + process.env.PORT);
});
