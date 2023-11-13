const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 5000;

const url = 'mongodb+srv://dhruviladani:dhruviladani@studentsdb.vkduu1o.mongodb.net/StudentsDB?retryWrites=true&w=majority&appName=AtlasApp'; // MongoDB connection URL
const dbName = 'StudentsDB'; // Name of your database

app.use(express.static('public')); // Serve HTML and other static files

// Connect to the MongoDB database
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db(dbName);

  // Define an API endpoint to fetch data from MongoDB
  app.get('/api/data', (req, res) => {
    const collection = db.collection('users'); // Name of your collection
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(data);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
