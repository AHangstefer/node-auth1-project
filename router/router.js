const express = require("express")
const bycrypt = require("bcryptjs")
const Users = require("./model")
const {restrict} =require("./middleware")


const router = express.Router()

router.get("/users", restrict(), async (req, res, next)=> {
    try{
        res.json(await Users.find())
    }
    catch(err){

    }
})

router.post("/users", async (req, res, next)=> {
    try{

        const {username, password} =req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            return res.status(409).json({
                message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            password:await bycrypt.hash(password, 10)
        })

        res.status(201).json(newUser)
    }
    catch(err){
        next(err)
    }
})

// router.post("/login")

// router.post("/register")


module.exports = router

