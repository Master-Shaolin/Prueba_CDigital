const { matchedData } = require("express-validator")
const { productsModel } = require("../models")
const { handleError } = require("../utils/handleError")
const PUBLIC_URL = process.env.PUBLIC_URL

/**
 * Get products list
 * @param {*} req
 * @param {*} res
 */
const getProducts = async (req,res) => {
  const data = await productsModel.find({})
  res.send({data})
}

/**
 * Get single product
 * @param {*} req
 * @param {*} res
 */
const getProduct = (req,res) => {}

/**
 * Create product
 * @param {*} req
 * @param {*} res
 */
const createProduct = async (req,res) => {
  try {
    const { files } = req
    const body = matchedData(req)
    const images = files.map((file) => {
      return `${PUBLIC_URL}/${file.filename}`
    })
    body.images = images
    const data = await productsModel.create(body)
    res.send({data})
  } catch (error) {
    handleError(res, "ERROR_CREATE_PRODUCT")
  }
}

/**
 * Update product
 * @param {*} req
 * @param {*} res
 */
const updateProduct = (req,res) => {}

/**
 * Delete product
 * @param {*} req
 * @param {*} res
 */
const deleteProduct = (req,res) => {}

module.exports = {getProducts,getProduct,createProduct,updateProduct,deleteProduct}