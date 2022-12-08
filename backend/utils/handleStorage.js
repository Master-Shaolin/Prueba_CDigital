const multer = require("multer")
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const pathStorage = `${__dirname}/../storage`
    cb(null,pathStorage)
  },
  filename: function(req, file, cb) {
    const fileArray = file.originalname.split(".")
    const filename = `product-${fileArray[0]}_${Date.now()}.${fileArray.pop()}`
    cb(null,filename)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware