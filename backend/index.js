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

app.post('/groups', (req, res) => {
    const group = {
        name: req.body.name,
        users: req.body.users
    };
    const groups = db.collection('groups');
    groups.add(group).then(doc => {
        console.log('Group document created with ID:', doc.id);
        res.status(201).send('Group document created');
    }).catch(err => {
        console.error('Error creating group document:', err);
        res.status(500).send('Error creating group document');
    });
});

app.get('/users/:userID/groups', (req, res) => {
    let uid = req.params.userID;
    const groupsCollection = db.collection('groups');
    groupsCollection.where('users', 'array-contains', uid).get().then(querySnapshot => {
        let groups = [];
        querySnapshot.forEach(doc => {
            const group = doc.data();
            group.id = doc.id;
            groups.push(group);
        });
        res.status(200).json(groups);
    }).catch(err => {
        console.error('Error retrieving groups:', err);
        res.status(500).send('Error retrieving groups');
    });
});

app.post('/expenses', (req, res) => {
    let expense = {
        uid: req.body.uid,
        groupId: req.body.groupId,
        expenseTitle: req.body.expenseTitle,
        expensePrice: req.body.expensePrice,
        createdAt: new Date()
    };
    const expensesCollection = db.collection('expenses');
    expensesCollection.add(expense).then(doc => {
        console.log('Expense document created with ID:', doc.id);
        res.status(201).send('Expense document created');
    }).catch(err => {
        console.error('Error creating expense document:', err);
        res.status(500).send('Error creating expense document');
    });
});

app.get('/groups/:groupID/expenses', (req, res) => {
    let groupId = req.params.groupID;
    const expensesCollection = db.collection('expenses');
    expensesCollection.where('groupId', '==', groupId).get().then(querySnapshot => {
        let expenses = [];
        querySnapshot.forEach(doc => {
            const expense = doc.data();
            expense.id = doc.id;
            expenses.push(expense);
        });
        res.status(200).json(expenses);
    }).catch(err => {
        console.error('Error retrieving expenses:', err);
        res.status(500).send('Error retrieving expenses');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
