var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const alert = require('alert')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.signinUser;
    var phno = req.body.signinNum;
    var email = req.body.signinEmail;
    var password = req.body.signinPassword;

    var data = {
        "name": name,
        "phno": phno,
        "email" : email,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('home.html')

})
app.get("/billing", (req, res)=>{
    res.redirect('payment.html')
})
app.post("/billing", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var city = req.body.city;
    var zipcode = req.body.zipcode;   
    var data1 = {
        "name" : name,
        "email": email,
        "address" : address,
        "city" : city,
        "zipcode" : zipcode }
    
        db.collection('payment').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Billing");
         });
     return res.redirect('carddetails.html')
})

app.get("/card", (req, res)=>{
    res.redirect('carddetails.html')
})
app.post("/card", (req, res)=>{
    var name = req.body.first;
    var number = req.body.number;
    var expiry = req.body.expiry;
    var ccv = req.body.ccv;   
    var data2 = {
        "first-name":name,
        "number" : number,
        "expiry": expiry,
        "ccv" : ccv,
    }
db.collection('card').insertOne(data2,(err,collection)=>{
            if(err){

                throw err;
            }
            console.log("card");
         });
         alert("PAYMENT SUCCESSFUL");
     return res.redirect('home.html')
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(4000);


console.log("Listening on PORT 3000");