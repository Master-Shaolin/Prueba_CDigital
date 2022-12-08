const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateProduct = [
  check("title").exists().notEmpty(),
  check("price").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("category").exists().notEmpty().isMongoId(),
  check("stock").exists().notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateProduct }