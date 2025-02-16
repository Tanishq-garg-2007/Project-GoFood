const { MongoClient } = require("mongodb");
const fs = require("fs");

const MONGO_URI = "mongodb+srv://gofood:1234@cluster0.tvmnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const DATABASE_NAME = "gofoodmern";
const COLLECTION_NAME = "foodCategory";
const JSON_FILE_PATH = "./foodCategory.json"; 
async function uploadData() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const rawData = fs.readFileSync(JSON_FILE_PATH, "utf-8");
        const data = JSON.parse(rawData);

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
