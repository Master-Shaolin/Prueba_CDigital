const mongoose = require("mongoose")
const SchemaTypes = mongoose.Schema.Types;

const CartScheme = new mongoose.Schema(
  {
    products: {
      type: Array,
      default: []
    },
    totalQuantity: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    user: {
      type: SchemaTypes.ObjectId
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model("cart", CartScheme)