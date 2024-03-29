const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const dotenv = require('dotenv');
const passportConfig = require("./config/passport");



//routes import
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');



const app = express();


mongoose.connect('mongodb://localhost:27017/shop', {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database connection created.');
}).catch(err => {
    console.log(`Something went wrong while i tried connecting to the database→ ${err.message}`);
});

app.use(bodyParser.json());

//routes
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);

dotenv.config();
port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("<h1>HEYYYY</h1>");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});