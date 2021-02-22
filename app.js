const http = require('http')
const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path');
const bodyparser = require('body-parser')





const hostname = '127.0.0.1';
const port = 800;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pk', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const newformSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    age: String,
    phone: Number,
    email: String

});

const newform = mongoose.model('Kitten', newformSchema);//kittens collection will generate automatically


app.use(express.urlencoded());

app.post("/newForm", (req, res) => {

    var myData = new newform(req.body);

    myData.save().then(() => {
        res.send("This item has been saved to database")
    }).catch(() => {
        res.status(200).send("Item was not saved to the database")
    });

});


app.get("/home", (req, res) => {
    res.send("This is home page")
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'newForm.html'))

});

app.get("/new", (req, res) => {
    res.sendFile(path.join(__dirname, 'new.html'))
});


app.listen(port, () => {
    console.log(`The server is listening on http://${hostname}:${port}/`)
})