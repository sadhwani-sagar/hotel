const express = require('express');
const router = express.Router();
const person = require('../person');
router.post('/', async (req,res)=>{
    
    // const newPerson = new person();
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.occupation = data.occupation;
    // newPerson.city = data.city;
    // newPerson.salary = data.salary;
    // newPerson.yearsofservice = data.yearsofservice; iski jagah hum directly data pass kar sakte hai constructor me
//     const newPerson = new person(data);
//     newPerson.save(error, result =>{
//         if(error){
//             console.error("Error saving person:", error);
//             res.status(500).send("Internal Server Error");
//         } else {
//             res.status(201).send(result);
//         }
// });
 try {
    const data = req.body;

    const newPerson = new person(data);

    const savedPerson = await newPerson.save();
    res.status(201).send(savedPerson);
    console.log("Person saved successfully:", savedPerson);

 }catch(error){
    console.error("Error saving person:", error);
    res.status(500).send("Internal Server Error");
 }

})
router.get('/', async(req,res)=>{
    try{
        const people = await person.find();
        res.send(people);
    }catch(error){ 
       console.log("Error fetching people:", error);
       res.send("Internal Server Error");  
    }
})
router.get('/:occtype', async (req, res) => {

    try {

        const occtype = req.params.occtype.toLowerCase();

        const people = await person.find({
            occupation: occtype
        });

        if (people.length === 0) {
            return res.status(404).send("No people found");
        }

        res.status(200).send(people);

    } catch (error) {

        console.log("Error fetching people by occupation:", error);

        res.status(500).send("Internal Server Error");

    }

});

router.put('/:id',async (req,res)=>{
    try{
    const personId = req.params.id;
    const updatedData = req.body;
    const response = await (person.findByIdAndUpdate(personId, updatedData, 
        { new: true, 
          runValidators: true  
        })); 
     
        if(!response){
            return res.status(404).send("Person not found");
        }
        console.log("Person updated successfully");
        res.status(200).send({
            message :" updated successfully",
            response
        });
    }
    
  catch(error){
    console.log("Error updating person:", error);
    res.status(500).send("Internal Server Error");
}})



router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
      
        if(!response){
            return res.status(404).send("Person not found");

        }
        console.log("Person deleted successfully");
         res.status(200).send({
            
            message :" deleted successfully",
            response
        });

    }
    catch(error){
        console.log("Error deleting person:", error);
        res.status(500).send("Internal Server Error");
    }
   
})


module.exports = router;  