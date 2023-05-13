const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

let serviceAccount = require('./data.json');
let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Registration
app.post('/register', (req, res) => {
    const user = {
        uid: req.body.uid,
        email: req.body.email,
        username: req.body.username
    };
    const users = db.collection('users');
    users.add(user).then(doc => {
        console.log('User document created with ID:', doc.id);
        res.status(201).send('User document created');
    }).catch(err => {
        console.error('Error creating user document:', err);
        res.status(500).send('Error creating user document');
    });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
