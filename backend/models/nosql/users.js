const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    },
    address: {
      line_1: {
        type: String,
      },
      line_2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      zip: {
        type: Number,
      }
    },
    role: {
      type:["user","admin"],
      default: "user",
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model("users", UserScheme)