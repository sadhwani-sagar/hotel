const express = require('express');
const router = express.Router();
const menu = require('../menu');

router.post('/', async (req,res)=>{
    try {
        const data = req.body;

        const newMenuItem = new menu(data);

        const savedMenuItem = await newMenuItem.save();
        res.status(200).send(savedMenuItem);
        console.log("Menu item saved successfully:", savedMenuItem);

    }catch(error){
        console.error("Error saving menu item:", error);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/', async(req,res)=>{
    try{
        const menuItems = await menu.find();
        res.send(menuItems);
        console.log("Menu items fetched successfully:");
    }catch(error){ 
       console.log("Error fetching menu items:", error);
       res.send("Internal Server Error");  
    }
})
router.get('/:type', async (req, res) => {
    
    try {

        const type = req.params.type.toLowerCase();

        if (type === 'veg') {
            const menuItems = await menu.find({ isVeg: true });
            return res.status(200).send(menuItems);
        }
        if (type === 'nonveg') {
            const menuItems = await menu.find({ isVeg: false });
            return res.status(200).send(menuItems);
        }

        if (menuItems.length === 0) {
            return res.status(404).send("No menu items found");
        }

        res.status(200).send(menuItems);
    } catch (error) {
        console.error("Error fetching menu items by type:", error);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;