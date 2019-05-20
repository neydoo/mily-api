const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");


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
app.use(passport.initialize());

//routes
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);


app.get('/', (req, res) => {
    res.send("<h1>HEYYYY</h1>");
});

app.listen(8888, () => {
    console.log('App listening on port 8888!');
});