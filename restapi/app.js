var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongoUrl = "mongodb+srv://padamatigopi:gopirishi@cluster0.fgahdyv.mongodb.net/movies?retryWrites=true&w=majority";
var cors = require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 8124;
// save the database connection
var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// first default route
app.get('/',(req,res) => {
    res.send("Hiii From Express")
})


app.get('/movies',(req,res) => {
    db.collection('homemovie').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/filter/:id',(req,res) => {
    var id = parseInt(req.params.id);
    db.collection('review').find({"movie_id":id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.post('/review', (req,res) => {
    db.collection('movieposts').insertOne(req.body,(err,result) => {
        if(err) throw err;
        res.send('send data')
    })
})

app.get('/reviewmovie/:id', (req,res) => {
    let id = Number(req.params.id);
    db.collection('movieposts').find({"movie_id":id}).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/menu/:restId',(req,res) => {
    let restId = Number(req.params.restId)
    db.collection('review').find({"movie_id":restId}).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/contactus', (req,res) => {
    db.collection('contactus').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/contact',(req,res) => {
    db.collection('contactus').insertOne(req.body,(err,result) => {
        if (err) throw err;
        res.send('data send')
    })
})


MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('movies');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})
