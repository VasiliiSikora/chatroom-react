const express = require("express");
require('dotenv').config
const mongoose = require("mongoose")

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;

// Logging Middleware NEEDS TO BE BEFORE THE ROUTES (i.e. here).
app.use((req, res, next) => {
    console.log(`${new Date()} ${req.method} ${req.path}`);
    next()
})

app.use(express.json());
app.use(express.static('./client/build'))

app.get("api/test", (req,res) => {
    res.json({ result: "success" })
})

// Connect to mongodb (https://www.bezkoder.com/react-node-express-mongodb-mern-stack/)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection Successful")
}).catch((err) => {
    console.log(err.message)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})