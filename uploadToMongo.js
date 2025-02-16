const { MongoClient } = require("mongodb");
const fs = require("fs");

const MONGO_URI = "mongodb+srv://gofood:1234@cluster0.tvmnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Update if using a different connection
const DATABASE_NAME = "gofoodmern"; // Replace with your database name
const COLLECTION_NAME = "foodCategory"; // Replace with your collection name
const JSON_FILE_PATH = "./foodCategory.json"; // Update path if necessary

async function uploadData() {
    const client = new MongoClient(MONGO_URI);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Load JSON data from file
        const rawData = fs.readFileSync(JSON_FILE_PATH, "utf-8");
        const data = JSON.parse(rawData);

        // Insert data into MongoDB
        if (Array.isArray(data)) {
            await collection.insertMany(data);
        } else {
            await collection.insertOne(data);
        }

        console.log("Data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data:", error);
    } finally {
        await client.close();
    }
}

// Run the function
uploadData();
