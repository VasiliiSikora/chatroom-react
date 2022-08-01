// to be put in server.js

const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)

// Connect socket.io server to express server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Tells server which url is making calls to socket.io server (React App location)
        methods: ["GET", "POST"] // what requests are allowed
    }
})

// check for user connecting to socket server. on("<event name>") listens for event with event name
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`); // log the connected user's id

    // disconnect functionality
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})







server.listen(3001, () => {
    console.log("Server is running")
})