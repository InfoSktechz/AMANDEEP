// WE HAVE DONE WITH BOTH MONGODB_CLIENT AND MONGOOSE


// MONGOOSE ONE
const express = require("express");
const router = express.Router();
const Article = require('../models/Article');
const multer = require('multer');
const fs = require('fs');


// req.session.user
// ADD ARTICLE FORM ROUTE
router.get("/Add_Article", (req, res) => {

    // can't add ARTICLE without login
    const user = req.session.user;
    if (!user) {
        res.redirect("/Login");
        return;
    } else {
        res.render("Add_Article.ejs", { user: user });
    }

})


// ARTICLE VIEW ROUTE
router.get("/:id", (req, res) => {
    const user = req.session.user;
    var id = req.params.id;
    Article.find().exec()
        .then(articles => {
            res.render("Article", { articles: articles, id: id,  user: user  });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });

})



// IMAGE UPLOAD WITH MULTER
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Images_Uploaded');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage }).single('content_image');


// ADD ARTICLE POST ROUTE
router.post("/Add", upload, (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        res.redirect("/Login");
        return;
    } else {

        const content_image = req.file ? '/Images_Uploaded/' + req.file.filename : null;
        const newArticle = new Article({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            title: req.body.title,
            category: req.body.category,
            content_title: req.body.content_title,
            content_details_1: req.body.content_details_1,
            content_details_2: req.body.content_details_2,
            content_image,

        });

        // console.log("newArticle", newArticle);
        newArticle.save();

        req.session.message = { type: 'success', message: 'Article added successfully' }
        // var message = { message: 'Article updated successfully' }
        res.redirect("/");
    }
});



// EDIT FORM ROUTE WITH PREVIOUS DATA ALSO
router.get('/Edit_Article/:id', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.redirect("/Login");
        return;
    } else {
        // Render edit-article.ejs with article data based on ID
        var id = req.params.id;
        Article.find().exec()
            .then(articles => {

                res.render("Edit_Article", { articles: articles, id: id,  user: user });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Internal Server Error");
            });
    }
});

// EDIT ROUTE POST FROM ROUTE
router.post('/Edit/:id', upload, (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.redirect("/Login");
        return;
    } else {
        let id = req.params.id;
        let { name, email, phone, title, category, content_title, content_details_1, content_details_2 } = req.body;
        const content_image = req.file ? '/Images_Uploaded/' + req.file.filename : null;
        Article.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            title,
            category,
            content_title,
            content_details_1,
            content_details_2,
            content_image,
        })
            .then(article => {
                if (!article) {
                    return res.status(404).json({ message: 'Article not found' });
                }
                req.session.message = { type: 'success', message: 'Article updated successfully' };
                res.redirect("/");
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }
});


// DELETE ARTICLE ROUTE 
router.get('/Delete/:id', (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.redirect("/Login");
        return;
    } else {
        var id = req.params.id;
        Article.findByIdAndDelete(id)
            .then(article => {
                if (!article) {
                    return res.status(404).json({ message: 'Article not found' });
                }
                req.session.message = { type: 'success', message: 'Article Deleted successfully' };
                res.redirect("/");
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
    }
});





module.exports = router;


// THIS IS WITH MONGO DB CLIENT ALSO

// const { MongoClient, ObjectId } = require('mongodb');
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');

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

// // IMAGE UPLOAD WITH MULTER
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'public/Images_Uploaded');
//   },

//   filename: function (req, file, cb) {
//       cb(null, Date.now() + '_' + file.originalname);
//   }
// });
// var upload = multer({ storage: storage }).single('content_image');

// // ADD ARTICLE FORM ROUTE
// router.get("/Add_Article", async (req, res) => {
//   // can't add ARTICLE without login
//   const user = req.session.user;
//   if (!user) {
//       res.redirect("/Login");
//       return;
//   } else {
//       res.render("Add_Article.ejs", { user: user });
//   }
// });

// // ARTICLE VIEW ROUTE
// router.get("/:id", async (req, res) => {
//   const user = req.session.user;
//   const id = req.params.id;
//   const db = await connectDB();
//   try {
//     const articles = await db.collection('articles').find().toArray();
//     res.render("Article", { articles: articles, id: id,  user: user  });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   } finally {
//     await client.close();
//   }
// });

// // ADD ARTICLE POST ROUTE
// router.post("/Add", upload, async (req, res) => {
//   const user = req.session.user;
//   if (!user) {
//       res.redirect("/Login");
//       return;
//   } else {
//       const content_image = req.file ? '/Images_Uploaded/' + req.file.filename : null;
//       const newArticle = {
//           name: req.body.name,
//           email: req.body.email,
//           phone: req.body.phone,
//           title: req.body.title,
//           category: req.body.category,
//           content_title: req.body.content_title,
//           content_details_1: req.body.content_details_1,
//           content_details_2: req.body.content_details_2,
//           content_image,
//       };

//       const db = await connectDB();
//       try {
//         await db.collection('articles').insertOne(newArticle);
//         req.session.message = { type: 'success', message: 'Article added successfully' };
//         res.redirect("/");
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       } finally {
//         await client.close();
//       }
//   }
// });

// // EDIT FORM ROUTE WITH PREVIOUS DATA ALSO
// router.get('/Edit_Article/:id', async (req, res) => {
//   const user = req.session.user;
//   if (!user) {
//       res.redirect("/Login");
//       return;
//   } else {
//       const id = req.params.id;
//       const db = await connectDB();
//       try {
//         const articles = await db.collection('articles').find().toArray();
//         res.render("Edit_Article", { articles: articles, id: id,  user: user });
//       } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//       } finally {
//         await client.close();
//       }
//   }
// });

// // EDIT ROUTE POST FROM ROUTE
// router.post('/Edit/:id', upload, async (req, res) => {
//   const user = req.session.user;
//   if (!user) {
//       res.redirect("/Login");
//       return;
//   } else {
//       const id = req.params.id;
//       const { name, email, phone, title, category, content_title, content_details_1, content_details_2 } = req.body;
//       const content_image = req.file ? '/Images_Uploaded/' + req.file.filename : null;
//       const db = await connectDB();
//       try {
//         await db.collection('articles').updateOne(
//           { _id: ObjectId(id) },
//           {
//             $set: {
//               name,
//               email,
//               phone,
//               title,
//               category,
//               content_title,
//               content_details_1,
//               content_details_2,
//               content_image,
//             }
//           }
//         );
//         req.session.message = { type: 'success', message: 'Article updated successfully' };
//         res.redirect("/");
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       } finally {
//         await client.close();
//       }
//   }
// });

// // DELETE ARTICLE ROUTE 
// router.get('/Delete/:id', async (req, res) => {
//   const user = req.session.user;
//   if (!user) {
//       res.redirect("/Login");
//       return;
//   } else {
//       const id = req.params.id;
//       const db = await connectDB();
//       try {
//         await db.collection('articles').deleteOne({ _id: ObjectId(id) });
//         req.session.message = { type: 'success', message: 'Article Deleted successfully' };
//         res.redirect("/");
//       } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//       } finally {
//         await client.close();
//       }
//   }
// });

// module.exports = router;