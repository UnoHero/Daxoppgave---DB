// testModel.js

const mongoose = require('mongoose');

// Define the schema for the document
const testSchema = new mongoose.Schema({
  tittel: String,
  data: [String]
});

// Define the model based on the schema
const test = mongoose.model('testdb', testSchema);

// Function to fetch a document from the database and log it
const testModel = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch a document from the 'test' collection
    const document = await test.findOne();

    // Log the fetched document
    console.log("Fetched document from the database:");
    console.log(document);

    // Disconnect from the database
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error fetching document from the database:", error);
  }
};

module.exports = testModel;
