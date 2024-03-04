// testController.js

const Test = require("../models/testModel");

// Controller function to handle fetching a document
exports.getTestDocument = async (req, res) => {
  try {
    const document = await Test.findOne();
    res.json(document); // Sending the fetched document as JSON response
  } catch (error) {
    console.error("Error fetching document from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
