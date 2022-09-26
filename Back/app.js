const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./rooter/userRouter");

const mongoose = require("mongoose");

app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.SECRET_KEY}@cluster0.fbppb.mongodb.net/Kitty`,
    {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("conncetion reussit avec la BD\n");
  })
  .catch(() => console.log(error));

app.use(bodyParser.json());

app.use("/api/user", userRouter);

module.exports = app;
