const jwt = require("jsonwebtoken")
const validator = require("../validator/validator")

const authentication = function (req, res, next) {
    try {
        let token = req.headers["authorization"]
       // console.log(token)
        if (!token) {
            return res.status(400).send({ status: false, msg: "Please pass Token for authentication" })
        }

        const a = token && token.split(" ")[1]

        let decodedToken = jwt.verify(a, "group11",{ignoreExpiration:true})
        

        let expire = decodedToken.exp
        let iat = Math.floor(Date.now() / 1000)
        if (expire < iat) {
            return res.status(401).send({ status: false, msg: "token is expired" })
        }

        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "Token is Invalid,Please enter a valid token" })
        }

        req["userId"] = decodedToken.userId;
        next();

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

const authByUserId = function (req, res, next) {
    try {
        let id = req.userId
        let user = req.params.userId

        if (!validator.isValid(user)) {
            return res.status(400).send({ status: false, msg: "Please Enter User ID" })
        }

        if (!validator.isValidobjectId(user)) {
            return res.status(400).send({ staus: false, msg: "Please enter Valid UserID(24 char)" })
        }

        if (id !== user) {
            return res.status(403).send({ status: false, msg: "You are not authorized" })
        }

        next()

    }
    catch (error) {
        return res.staus(500).send({ status: false, msg: error.message })
    }
}

module.exports.authentication = authentication
module.exports.authByUserId = authByUserId
