const express = require("express")
const router = require("./router/router")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)
const cors = require("cors")
const db = require("./data/config")


const server = express()
const port = 2000

server.use(express.json())


server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret!",
    store: new knexSessionStore({
        knex: db,
        creatable: true
    }),
}))
server.use(cors())
server.use("/api", router )

server.listen(port, () => {
    console.log( `Running at http://localhost:${port} `)
})