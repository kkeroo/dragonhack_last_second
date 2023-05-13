const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const port = 5000;

let serviceAccount = require('./data.json');

let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();

// Middleware
app.use(express.json());

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, email } = req.body;

  if (!paymentMethodId) {
    res.status(400).send('Missing payment method ID');
    return;
  }

  if (!email) {
    res.status(400).send('Missing email');
    return;
  }

  try {
    // Check if customer with the provided email already exists
    const existingCustomers = await stripe.customers.list({ email: email });

    let customerId;

    if (existingCustomers.data.length) {
      // If customer already exists, get their ID
      customerId = existingCustomers.data[0].id;
    } else {
      // If customer does not exist, create a new customer
      const customer = await stripe.customers.create({ email: email });
      customerId = customer.id;
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // Set the payment method as the default for the customer
    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: paymentMethodId } });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,  // amount in the smallest currency unit (cents for USD)
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,  // Indicates that the customer is not in your checkout flow at the time of this payment attempt
      confirm: true,  // Automatically confirm the payment
    });

    // Respond with the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create payment intent');
  }
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

const getGroup = (groupId) => {
    return new Promise ((resolve, reject) => {
        const groupsCollection = db.collection('groups');
        groupsCollection.doc(groupId).get().then(groupDoc => {
            if (!groupDoc){
                resolve(null);
            }
            else{
                const groupData = groupDoc.data();
                resolve(groupData);
            }
        }).catch(err => {
            reject(err);
        });
    })
}

app.get('/groups/:groupID', (req, res) => {
    let groupId = req.params.groupID;
    getGroup(groupId).then(doc => {
        if (doc == null){
            console.log('No group found');
            res.status(404).send('No group found');
        }
        else{
            console.log('Successfully retrieved group with id: ' + doc.id);
            res.status(200).json(doc);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send('Internal server error');
    });
});

app.post('/groups', (req, res) => {
    const group = {
        name: req.body.name,
        users: req.body.users,
        budget: 0.0
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

const updateGroupBudget = (groupId, price) => {
    return new Promise((resolve, reject) => {
        getGroup(groupId).then(group => {
            if (group == null){
                reject('Can not find the group');
            }
            else{
                let budget = group.budget;
                if (budget - price < 0){
                    // Not enough funds
                    reject('Not enough funds in pool');
                }
                let newBudget = budget - price;
                db.collection('groups').doc(groupId).update({ budget: newBudget }).then(() => {
                    resolve('Budget updated from ' + budget + ' to ' + newBudget);
                }).catch(err => {
                    reject('Error updating field budget', err);
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
}

app.post('/expenses', (req, res) => {
    let expense = {
        uid: req.body.uid,
        groupId: req.body.groupId,
        expenseTitle: req.body.expenseTitle,
        expensePrice: req.body.expensePrice,
        createdAt: new Date()
    };
    const expensesCollection = db.collection('expenses');
    updateGroupBudget(expense.groupId, expense.expensePrice).then(message => {
        console.log(message);
        expensesCollection.add(expense).then(doc => {
            console.log('Expense document created with ID:', doc.id);
            res.status(201).send('Expense document created');
        }).catch(err => {
            console.error('Error creating expense document:', err);
            res.status(500).send('Error creating expense document');
        });
    }).catch(err => {
        console.error('Error updating expense budget', err);
        res.status(500).send('Error updating expense budget');
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