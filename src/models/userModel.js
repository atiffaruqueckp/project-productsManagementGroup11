const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,
        trim:true
    },
    profileImage: {
        type: String,
        required: true
    }, // s3 link
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true,
        
    }, // encrypted password
    address: {
        shipping: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            }
        },
        billing: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            }
        }
    },

}, { timestamps: true })

module.exports = mongoose.model("user8", userSchema)