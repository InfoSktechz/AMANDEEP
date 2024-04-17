

// WE HAVE DONE WITH BOTH MONGODB_CLIENT AND MONGOOSE 

// MONGOOSE
const express = require("express");
const User = require("../models/user");
const Article = require('../models/Article');
const router = express.Router();
var bcrypt = require('bcryptjs');


// HOME ROUTE
router.get("/", (req, res) => {

    const user = req.session.user;
    
    Article.find().exec()
        .then(articles => {
            res.render("index", { articles: articles, user: user });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});


// LOGIN PAGE ROUTE
router.get("/Login", (req, res) => {
    res.render("Login");
})


// LOGIN ROUTE POST FROM ROUTE 
router.post('/Log_In_Post', async (req, res) => {
    const { email, password } = req.body;

    // FOR SIGN UP PURPOSE

    // #### IMPORTANT #### CREATING NEW USER WITH THIS CODE

    // remove this comment below to create user new

    // const newUser = new User({
    //     name: "Amandeep Singh",
    //     email: req.body.email,
    //     password: req.body.password,
    // });
    // newUser.save();


    // FOR LOGIN PURPOSE
    try {
        // Find user by email
        
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
          // Render 404 page if user not found
          return res.render('404.ejs');
        }
    
        // Check password
        // const isMatch = await bcrypt.compare(password, user.password);
        if (password != user.password) {
          // Render 404 page if password doesn't match
          return res.render('404.ejs');
        }
    
        // Store user email in session
        req.session.user = user;
        req.session.save()
        // Redirect to homepage
        res.redirect('/');
      } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

module.exports = router;


// MONGODB_CLIENT ALSO HERE
// const express = require("express");
// const router = express.Router();
// const { MongoClient } = require('mongodb');
// const bcrypt = require('bcryptjs');

// // MongoDB connection URI
// const uri = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'CRUDAMANDEEP';

// // Function to connect to MongoDB
// async function connectDB() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to MongoDB
//     await client.connect();

//     // Access specific database
//     return client.db(dbName);
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// // HOME ROUTE
// router.get("/", async (req, res) => {
//   try {
//     const db = await connectDB();
//     const user = req.session.user;
//     const articles = await db.collection('articles').find().toArray();
//     res.render("index", { articles: articles, user: user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // LOGIN PAGE ROUTE
// router.get("/Login", (req, res) => {
//   res.render("Login");
// });

// // LOGIN ROUTE POST FROM ROUTE 
// router.post('/Log_In_Post', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const db = await connectDB();
//     // Find user by email
//     const user = await db.collection('users').findOne({ email });

//     // Check if user exists
//     if (!user) {
//       // Render 404 page if user not found
//       return res.render('404.ejs');
//     }

//     // Check password
//     if (password != user.password) {
//       // Render 404 page if password doesn't match
//       return res.render('404.ejs');
//     }

//     // Store user email in session
//     req.session.user = user;
//     req.session.save();

//     // Redirect to homepage
//     res.redirect('/');
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;