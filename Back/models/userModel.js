const mongoose = require("mongoose");

const user = mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ban: {
    data: {
      type: Date,
    },
    whoBan: {
      type: String,
    },
    timeBan: {
      type: Date,
    },
  },
  status: {
    type: String,
    required: true,
  },
  colorAdmin: {
    type: String,
  },
});

module.exports = mongoose.model("user", user);
