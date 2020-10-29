const bcrypt = require("bcryptjs")
const Users = require("./model")

function restrict(){
    return async (req, res, next) => {
        try {
            if(!req.session || !req.session.user){
                return res.status(401).json({
                    message: "invalid credentials"
                })
            }
            next()

        }
        catch(err){
            next(err)
        }
    }
}

module.exports = {
    restrict,
}