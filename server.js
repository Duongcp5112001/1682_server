require("dotenv").config({ path: `.env` });
const express = require('express')
const Api = require('./routes/api')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser()) 


//Router
app.use('/api', Api)

//Connect DB
const URL = process.env.MONGODB_URL
mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: false,
    })
    .then(() => {
        console.log(`DB connect successfully`);
    })
    .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
    });

app.get("/", (req, res) => {
    res.send("Success");
});

const port = process.env.PORT || 1682
app.listen(port, () => {
    console.log('server is running on port ' + port)
})