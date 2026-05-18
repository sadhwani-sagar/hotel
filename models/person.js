const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    age: {
        type:Number,
    },
    occupation : {
        type : String,
        enum : ['chef', 'waiter', 'manager', 'cleaner','doctor','engineer','teacher','student'],
        required : true
    },
    city : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    yearsofservice : {
        type : Number,
    }
});

const person = mongoose.model('person', personSchema);

module.exports =  person;