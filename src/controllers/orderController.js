const validator = require("../validator/validator")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const cartModel = require("../controllers/cartController")


const createOrder = async function (req, res) {
    try {

        const id = req.params.userId;
        const input = req.body;

        if (!validator.isValidobjectId(id)) {
            return res.status(400).send({ status: false, message: `${id} is not a valid user id` })
        }

        if (!validator.isValidReqBody(input)) {
            return res.status(400).send({ status: false, msg: "Please Enter some data to create" })
        }

        const { userId, items } = input

        if (!validator.isValid(userId)) {
            return res.status(400).send({ status: true, message: 'userid is required in the request body' })
        }
        if (!validator.isValidobjectId(userId)) {
            return res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
        }

        if (id !== userId) {
            return res.status(400).send({ status: false, msg: "Pass Same UserID" })
        }

        const user = await userModel.findOne({ userId: id })
        if (!user) {
            return res.status(400).send({ status: false, msg: "No Such User Exists" })
        }

        if (items.length === 0) {
            return res.status(400).send({ status: false, msg: 'items cant be empty' })
        }
        if (!validator.isValid(items)) {
            return res.status(400).send({ status: false, message: 'items is required in the request body' })
        }

        let { productId, quantity } = items
        let totalPrice = 0
        let qty = 0

        for (let i = 0; i < items.length; i++) {
            let productId = items[i].productId
            quantity = items[i].quantity

            const product = await productModel.findOne({ _id: productId, isDeleted: false })
            if (!product) {
                return res.status(404).send({ status: false, msg: "No such Product Found" })
            }

            price = product.price

            totalPrice = totalPrice + (price * quantity)

            qty = qty + quantity
        }
        const final = {
            userId: id,
            items: items,
            totalPrice: totalPrice,
            totalItems: items.length,
            totalQuantity: qty


        }

        const createProduct = await orderModel.create(final)
        return res.status(201).send({ status: true, msg: 'sucesfully created order', data: createProduct })

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })
    }
}

// const createOrder = async function(req,res){
//     try{

//      const id = req.params.userId;
//      const input = req.body;

//      if (!validator.isValidobjectId(id)) {
//         return res.status(400).send({ status: false, message: `${id} is not a valid user id` })
//     }

//      if(!validator.isValidReqBody(input)){
//          return res.status(400).send({status:false,msg:"Please Enter some data to create"})
//      }

//      const {userId,items} = input 

//      if (!validator.isValid(userId)) {
//         return res.status(400).send({ status: true, message: 'userid is required in the request body' })
//     }
//     if (!validator.isValidobjectId(userId)) {
//         return res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
//     }

//     if(id !== userId){
//         return res.status(400).send({status:false,msg:"Pass Same UserID"})
//     }

//     const user = await userModel.findOne({userId: id})
//     if(!user){
//         return res.status(400).send({status:false,msg:"No Such User Exists"})
//     }

//     if (items.length === 0) {
//         return res.status(400).send({ status: false, msg: 'items cant be empty' })
//     }
//     if (!validator.isValid(items)) {
//         return res.status(400).send({ status: false, message: 'items is required in the request body' })
//     }

//     const {productId,quantity} = items[0]
    
//     const product = await productModel.findOne({_id:productId,isDeleted:false})
//     if(!product){
//         return res.status(404).send({status: false,msg:"No such Product Found"})
//     }

//     const totalPrice = quantity * product.price
//     const final = {
//          userId:id,
//          items:items,
//          totalPrice:totalPrice,
//          totalItems:items.length,
//          totalQuantity:quantity         


//     }

    
//     const createProduct = await orderModel.create(final)
//     return res.status(201).send({ status: true, msg: 'sucesfully created order', data: createProduct })
     
     
// }
//     }
//     catch(error){
//      console.log(error)
//      return res.status(500).send({status:false,msg:error.message})
//     }
// }

const updateOrder =async function(req,res){
    try{
        let requestBody = req.body;
        const userId = req.params.userId

        const { orderId } = requestBody

        if (!validator.isValidReqBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Please provide cart details' });
            return;
        }
        if (!validator.isValid(orderId)) {
            return res.status(400).send({ status: false, message: 'orderId is required in the request body' })
        }
        if (!validator.isValidobjectId(orderId)) {
            return res.status(400).send({ status: false, message: `${orderId} is not a valid user id` })
        }
        const checkOrder = await orderModel.findOne({ _id: orderId, isDeleted: false })
        if(!checkOrder){
            return res.status(404).send({ status: false, message: 'No Such Data Found ' })
        }
        if (!(checkOrder.userId == userId)) {
            return res.status(400).send({ status: false, message: 'order not belongs to the user ' })
        } 
        if (!(checkOrder.cancellable === true)) {
            return res.status(400).send({ status: false, message: 'order didnt have the cancellable policy ' })
        }
        if(checkOrder.status === "completed"){
            return res.status(400).send({status : false,message:"order is already delivered"})
        }
        let updateOrder = await orderModel.findOneAndUpdate({ _id: orderId }, { status: "canceled" }, { new: true })
       return res.status(200).send({ status: true, msg: 'succesfully updated', data: updateOrder })

    }
    catch(error){
        console.log(error)
        return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports = {createOrder,updateOrder}