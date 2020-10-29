const express = require("express")
const router = require("./router/router")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)
const db = require("./data/config")


const server = express()
const port = 2000

server.use(express.json())
server.use("/api", router )

server.listen(port, () => {
    console.log( `Running at http://localhost:${port} `)
})