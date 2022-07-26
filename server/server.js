const express = require("express");
require('dotenv').config
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;

//https://expressjs.com/en/resources/middleware/cors.html
//https://www.npmjs.com/package/cors
app.options('*', cors())
app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use(express.json());
app.use(express.static('./client/build'))

// Keep routes neat without repeat code
app.use('/api/auth',userRoutes)

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