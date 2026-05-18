const express = require('express'); 

const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const person = require('./models/person');

const menu = require('./models/menu');


app.get('/', (req,res)=>{
    res.send(" hello ji how can assi help jaaaa");
});







// app.get('/person/:occtype', async(req,res)=>{  
//     const occtype = req.params.occtype;  
//     try{
//         if (['chef', 'waiter', 'manager', 'cleaner','doctor','engineer','teacher','student'].includes(occtype)) {
//             const people = await person.find({occupation : occtype});
//             res.status(200).send(people);
//         } 
//         else{
//             res.status(404).send("occupation not found");
//         }
//     }        
//         catch(error){
//             console.log("Error fetching people by occupation:", error);
//             res.status(400).send("Internal Server Error");
//         }
// }) if statement ki jagah hum directly query me hi check kar sakte hai ki occupation valid hai ya nahi


//import the router
const personroutes = require('./models/routes/personroutes');
app.use('/person', personroutes)
const menuroutes = require('./models/routes/menuroutes');
app.use('/menu', menuroutes);


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});