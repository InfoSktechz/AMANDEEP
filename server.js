
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const axios = require('axios');
var cors = require('cors');
var http = require('http');
const bodyParser = require('body-parser');

// WE HAVE USED BOTH MONGOOSE AND MONGODB_CLIENT TO CONNECTING TO MONGO DB

// First command=  npm init -y
// Second command= npm start

// MONGO URL
const mongoURL = 'mongodb+srv://infosktechz:SDUbDIB0GOtxUZ1g@crudamandeep.tsaeqwy.mongodb.net/?retryWrites=true&w=majority&appName=CRUDAMANDEEP';


// DB NAME = CRUDAMANDEEP

// CONNECT TO MONGODB WITH MONGOOSE
mongoose.connect('mongodb+srv://infosktechz:SDUbDIB0GOtxUZ1g@crudamandeep.tsaeqwy.mongodb.net/?retryWrites=true&w=majority&appName=CRUDAMANDEEP');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});


// CONNECT TO MONGODB WITH MONGODB CLIENT

// MongoDB Connection URL
// const mongoURL = 'mongodb+srv://infosktechz:SDUbDIB0GOtxUZ1g@crudamandeep.tsaeqwy.mongodb.net/?retryWrites=true&w=majority&appName=CRUDAMANDEEP';

// const ConnectToMongoDB = async () => {
//     // Connect to MongoDB
//     const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// };
// ConnectToMongoDB();


const app = express();
const PORT = process.env.PORT || 4000;




//Middelware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})



// PUBLIC FOLDER ACCESS
app.use(express.static('public'));


// ROUTES


app.use("", require('./routes/userRoutes'));
// HOME ROUTE
// LOGIN ROUTE PAGE
// LOGIN ROUTE POST FROM ROUTE

// ####we have't build register user, Please View routes/userRoutes #Login POST FROM ROUTE


app.use("/Article", require('./routes/articleRoutes'));
// ADD ARTICLE FORM ROUTE
// ADD ARTICLE POST ROUTE
// ARTICLE VIEW ROUTE
// EDIT FORM ROUTE WITH PREVIOUS DATA ALSO
// EDIT ROUTE POST FROM ROUTE
// DELETE ARTICLE ROUTE 


// 404 ROUTE
app.use((req, res, next) => {
    res.render('404.ejs');
});


// Set template engine FOR EJS
app.set('view engine', 'ejs');


// http.createServer(function(req,res){
//     res.redirect('/');
// }).listen(80);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
