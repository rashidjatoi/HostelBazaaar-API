const express = require("express");
const newsletterRouter = require("./src/router/newsletter_route");
const mongoose = require("./src/config/db");
const app = express();

// Middleware
app.use(express.json());
app.use(newsletterRouter);


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
