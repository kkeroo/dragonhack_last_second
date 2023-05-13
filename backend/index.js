const express = require('express');
const app = express();
const port = 3000;

let serviceAccount = require('./data.json');
let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
