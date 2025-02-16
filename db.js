const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://gofood:1234@cluster0.tvmnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            dbName: "gofoodmern"
        });
        console.log("MongoDB connected successfully");

        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        console.log("Food items loaded into global variable.");

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
        console.log("Food Category loaded into global variable.");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); 
    }
};

module.exports = mongoDB;
