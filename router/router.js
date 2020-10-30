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

router.post("/register", async (req, res, next)=> {
    try{

        const {username, password} =req.body
        console.log("outside register", username)
        const user = await Users.findBy({ username }).first()
        console.log("inside register", username)

        if (user) {
            return res.status(409).json({
                message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            password:await bycrypt.hash(password, 14)
        })

        res.status(201).json(newUser)
    }
    catch(err){
        next(err)
    }
})

router.post("/login", async (req, res, next)=> {
    try{
        //console.log( req.body )
        const {username, password} = req.body
        console.log( req.body )
        //console.log("outside log in", username)
        const user = await Users.findBy({ username }).first()
        //console.log("inside log In", username)

        if(!user){
            return res.status(401).json({
                message: "That user does not exist"
            })
        }

        const passowrdValid = await bycrypt.compare(password, user.password)

            if(!passowrdValid){
                return res.status(401).json({
                    message: "This password is invalid"
                })
            }

            req.session.user = user

            res.json({
                message: `Welcome ${user.username}!`
            })
    }
    catch(err){
        next(err)
    }
})




module.exports = router

