const mongoose = require("mongoose")
const SchemaTypes = mongoose.Schema.Types;

const ProductScheme = new mongoose.Schema(
  {
    title: {
      type: String
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: SchemaTypes.ObjectId
    },
    images: {
      type: Array,
      default: []
    },
    stock: {
      type: Number,
    },
    rating: {
      rate: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model("products", ProductScheme)