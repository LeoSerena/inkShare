var mongoose = require('mongoose');

const password = 'xEAFKmnYFpqbCX81'


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test_admin:" + password + "@cluster0-1mcyu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
    console.log('connected')
    client.close();
});

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
})

var Person = mongoose.model('Person', personSchema)