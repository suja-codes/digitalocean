require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';

let db            = null;

// connect to mongo with async call
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) return cachedDb;

    const client = await MongoClient.connect(process.env.DATABASE_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected successfully to db server");
    // connect to my project database
    db = client.db('myproject');

    cachedClient = client;
    cachedDb = db;
    return db;
}

// create user account
function create(name, email, password) {
    return new Promise(async (resolve, reject) => {
        const db = await connectToDatabase();
        const collection = await db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user account 
function find(email) {
        return new Promise(async (resolve, reject) => {
            const db = await connectToDatabase();
            const customers = await db
                .collection('users')
                .find({ email: email })
                .toArray(function (err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
}

// find user account
function findOne(email) {
    return new Promise(async (resolve, reject) => {
        const db = await connectToDatabase();
        const customers = await db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise(async (resolve, reject) => {
        const db = await connectToDatabase();
        const customer = await db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// all users
function all() {
    return new Promise(async (resolve, reject) => {
        const db = await connectToDatabase();
        const customers = await db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, findOne, find, update, all};