require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require("./routes/route");
const userRoutes = require("./routes/user"); // Correct route import
const testModel = require("./models/testModel");
const testController = require("./controllers/testController");

const app = express();

// Cors middleware
app.use(cors());

// Body parser middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/admin", Routes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      // Call testModel function to fetch a document from the database
      testModel();
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Define test route
app.get("/test", testController.getTestDocument);
