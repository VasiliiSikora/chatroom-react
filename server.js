const express = require("express");
require('dotenv').config
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const auth = require("./auth");
const http = require('http')
const { Server } = require('socket.io')

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;

// store session on server similar to cookies: https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//https://expressjs.com/en/resources/middleware/cors.html
//https://www.npmjs.com/package/cors
app.options('*', cors())
app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
app.use(express.static('../client/build'))

// cookie parser middleware
app.use(cookieParser());

// Keep routes neat without repeat code: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
app.use('/api/auth',userRoutes)

app.get("api/test", (req,res) => {
    res.json({ result: "success" })
})

// Connect to mongodb (https://www.bezkoder.com/react-node-express-mongodb-mern-stack/)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successful")
    console.log(process.env.MONGO_URI)
}).catch((err) => {
    console.log(err.message)
})

// Socket.io
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

    // join room functionality
    socket.on("join_room", (data) => { // where data is the room id 
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        // use to(data.room) to tell which room to send to
        socket.to(data.room).emit("receive_message", data)
    })

    // disconnect functionality
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})


// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

// https://stackoverflow.com/questions/41534370/socket-io-wont-work-connect-in-reactjs-app
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})