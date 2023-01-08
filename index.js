if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Quote = require('./models/quote');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URI); //connect to the mongodb
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose'));

app.get ('/',  (req, res) => {
    res.send("Welcome to Trump Quotes");
});

app.get ('/all', async (req, res) => {
    let quotes;
    try {
         quotes = await getAll();
    } catch {
        quotes = [];
    }
    res.send(quotes);
});

app.get ('/random', async (req, res) => {
    let quote;
    try{
        const quotes = await getAll();
        const random = (Math.floor((Math.random() * quotes.length) + 1));
        quote = quotes[random];
    } catch {
        quote = [];
    }
    res.send(quote);
});

app.listen(process.env.PORT || 4000);

function getAll () {
    return Quote.find({}, '-_id topic year quote');
}