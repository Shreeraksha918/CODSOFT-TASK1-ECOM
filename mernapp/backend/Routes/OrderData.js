const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date }); // Adding date to the beginning of the array

        await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } },
            { upsert: true } // Creates the document if it doesn't exist
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/myorderData', async (req, res) => {
    try {

        let mydata=await Order.findOne({'email':req.body.email})
        res.json({orderData:mydata})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }
})


module.exports = router;
