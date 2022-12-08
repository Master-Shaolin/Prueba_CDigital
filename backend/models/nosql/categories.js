const mongoose = require("mongoose")

const CategoriesScheme = new mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model("categories", CategoriesScheme)