// db.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gokula574242@cluster0.cpwndsg.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');
        
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetchedData;

        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // Handle error appropriately
    }
}

module.exports = mongoDB;
