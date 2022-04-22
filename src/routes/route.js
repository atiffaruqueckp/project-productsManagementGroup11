const express = require("express")
const router = express.Router()

const userControllers = require("../controllers/userController")
const productController = require("../controllers/productController")
const cartController = require("../controllers/cartController")
const orderController = require("../controllers/orderController")
const middleware = require("../middleware/middleware")

//user

router.post("/register", userControllers.register)
router.post("/login", userControllers.login)
router.get("/user/:userId/profile", middleware.authentication, middleware.authByUserId, userControllers.getProfile)
router.put("/user/:userId/profile", middleware.authentication, middleware.authByUserId, userControllers.updateProfile)

//Product

router.post("/products", productController.products)
router.put("/products/:productId", productController.updateProduct)
router.get("/products", productController.getProductbyQuery)
router.get("/products/:productId", productController.getProduct)
router.delete("/products/:productId", productController.deleteProduct)

//Cart

router.post("/users/:userId/cart", middleware.authentication, middleware.authByUserId, cartController.createCart)
router.put("/users/:userId/cart", middleware.authentication, middleware.authByUserId, cartController.updateCart)
router.get("/users/:userId/cart", middleware.authentication, middleware.authByUserId, cartController.getCart)
router.delete("/users/:userId/cart", middleware.authentication, middleware.authByUserId, cartController.deleteCart)

//order

router.post("/users/:userId/orders", middleware.authentication, middleware.authByUserId, orderController.createOrder)
router.put("/users/:userId/orders", middleware.authentication, middleware.authByUserId, orderController.updateOrder)


module.exports = router