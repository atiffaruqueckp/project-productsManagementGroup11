const express = require("express")
const router = express.Router()

const userControllers = require("../controllers/userController")
const productController = require("../controllers/productController")
const middleware = require("../middleware/middleware")

router.post("/register",userControllers.register)
router.post("/login",userControllers.login)
router.get("/user/:userId/profile",middleware.authentication,middleware.authByUserId,userControllers.getProfile)
router.put("/user/:userId/profile",middleware.authentication,middleware.authByUserId,userControllers.updateProfile)

//Product

router.post("/products",productController.products)
router.put("/products/:productId",productController.updateProduct)
router.get("/products",productController. getProductbyQuery)
router.get("/products/:productId",productController.getProduct)
router.delete("/products/:productId",productController.deleteProduct)


module.exports = router
