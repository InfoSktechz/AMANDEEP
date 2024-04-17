const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content_title: {
        type: String,
        required: true
    },
    content_details_1: {
        type: String,
        required: true
    },
    content_details_2: {
        type: String,
        required: true
    },
    content_image: {
            type: String,
            required: true
        }
})

module.exports = mongoose.model("Articles", articleSchema);

// WITH MONGO CLIENT ALSO HERE

// const { MongoClient, ObjectId } = require('mongodb');

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
//     const db = client.db(dbName);

//     // Define article collection
//     const articleCollection = db.collection('articles');

//     // Define article schema validation rules using JSON schema
//     const articleSchema = {
//       validator: {
//         $jsonSchema: {
//           bsonType: 'object',
//           required: ['name', 'email', 'phone', 'title', 'category', 'content_title', 'content_details_1', 'content_details_2', 'content_image'],
//           properties: {
//             name: { bsonType: 'string', description: 'must be a string and is required' },
//             email: { bsonType: 'string', description: 'must be a string and is required' },
//             phone: { bsonType: 'string', description: 'must be a string and is required' },
//             date: { bsonType: 'date', description: 'must be a date and is required' },
//             title: { bsonType: 'string', description: 'must be a string and is required' },
//             category: { bsonType: 'string', description: 'must be a string and is required' },
//             content_title: { bsonType: 'string', description: 'must be a string and is required' },
//             content_details_1: { bsonType: 'string', description: 'must be a string and is required' },
//             content_details_2: { bsonType: 'string', description: 'must be a string and is required' },
//             content_image: { bsonType: 'string', description: 'must be a string and is required' }
//           }
//         }
//       }
//     };

//     // Create article collection with schema validation
//     await articleCollection.createIndex({ name: 1 }, { unique: true });
//     await articleCollection.createIndex({ email: 1 });
//     await articleCollection.createIndex({ phone: 1 });
//     await articleCollection.createIndex({ title: 1 });
//     await articleCollection.createIndex({ category: 1 });
//     await articleCollection.createIndex({ date: 1 });

//     // Set validation rules
//     await articleCollection.validate();

//     return articleCollection;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// module.exports = { connectDB };
