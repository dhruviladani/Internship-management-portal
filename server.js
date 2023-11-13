const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 5000;
app.set('view engine', 'ejs');

// Connection URL and Database Name
const username = 'dhruviladani';
const password = 'dhruviladani'; // Your MongoDB password
const dbName = 'StudentsDB';

const uri = `mongodb+srv://${username}:${password}@studentsdb.vkduu1o.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=AtlasApp`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection('users');

    const data = await collection.find({}).toArray();
    res.render('index', { data }); // Render the EJS template with the fetched data
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
