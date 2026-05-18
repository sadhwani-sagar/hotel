const mongoose = require("mongoose");

const Menu = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    price: {
        type:Number,
        required : true
    },
    isVeg : {
        type : Boolean,
        default : true
    },  
    isDrink :{
        type : Boolean,
        default : false
    }
});

const menu = mongoose.model("menu", Menu);

module.exports = menu;    
