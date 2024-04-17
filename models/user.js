const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("User", userSchema);


// WITH MONGO_CLIENT ALSO HERE

// const { MongoClient } = require('mongodb');

// // DATABASE IN MONGODB IS = CRUDAMANDEEP

// // MongoDB connection URI
// const url = 'mongodb://localhost:27017/CRUDAMANDEEP';
// const client = new MongoClient(url);

// // Define the user schema
// const userSchema = {
//   name: { type: 'string', required: true },
//   email: { type: 'string', required: true },
//   password: { type: 'string', required: true }
// };

// async function addUser(user) {
//   try {
//     await client.connect();
//     const database = client.db('CRUDAMANDEEP'); 
//     const usersCollection = database.collection('users');

//     // Insert the user document into the users collection
//     await usersCollection.insertOne(user);
//     console.log('User added successfully');
//   } catch (error) {
//     console.error('Error adding user:', error);
//   } finally {
//     await client.close();
//   }
// }

// // Usage example
// const newUser = {
//   name: 'John Doe',
//   email: 'john@example.com',
//   password: 'hashedPassword' // Remember to hash the password before storing it in the database
// };

// addUser(newUser);


