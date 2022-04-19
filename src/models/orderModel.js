const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: "user8",
        required: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: "product7",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number //, comment: "Holds total price of all the items in the cart"
    },
    totalItems: {
        type: Number //, comment: "Holds total number of items in the cart"
    },
    totalQuantity: {
        type: Number //, comment: "Holds total number of items in the cart"
    },
    cancellable: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ["pending", "completed", "cancled"]
    },
    deletedAt: {
        type: Date,
        required: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model("order7", orderSchema)