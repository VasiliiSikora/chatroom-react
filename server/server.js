const express = require("express");
require('dotenv').config

const app = express();
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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})