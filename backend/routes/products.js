const express = require("express")
const router = express.Router()
const uploadMiddleware = require("../utils/handleStorage")
const { validatorCreateProduct } = require("../validators/products")
const { getProducts, getProduct, createProduct} = require("../controllers/products")

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", uploadMiddleware.array("images"), validatorCreateProduct, createProduct)

module.exports = router