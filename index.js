const express = require("express");
const app = express();
const mongoose = require("./src/config/db");
require('dotenv').config();

// Import Models
const newsletterRouter = require("./src/router/newsletter_route");
const authRouter = require("./src/router/auth_route");

// constants
let apiConst = "api/v1";

// Middleware
app.use(express.json());
app.use("/api/v1/newsletter" , newsletterRouter);
app.use("/api/v1/auth" , authRouter);


app.get("/", (req, res) => {
  res.json({
    message: "Server Working",
    status: 200,
  });
});

app.listen(process.env.PORT, () => {
  console.log("Connected at PORT: " + process.env.PORT);
});
