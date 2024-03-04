require("dotenv").config({ path: "../.env" });
const mongoose = require('mongoose');
const userHandler = require('../handler/userHandler');

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');

    // Test CRUD operations
    // Create user
    userHandler.createUser({
      name: 'Ola Nordman',
      email: 'Ola@example.com',
      password: 'password123'
    }).then(createdUser => {
      console.log('Created user:', createdUser);

      // Read user
      userHandler.getUserById(createdUser._id).then(foundUser => {
        console.log('Found user:', foundUser);

        // Update user
        userHandler.updateUser(foundUser._id, { name: 'Ola Nordman' }).then(updatedUser => {
          console.log('Updated user:', updatedUser);

          // Delete user
          userHandler.deleteUser(updatedUser._id).then(deletedUser => {
            console.log('Deleted user:', deletedUser);

            // Close the database connection
            mongoose.connection.close();
          }).catch(error => console.error('Error deleting user:', error));
        }).catch(error => console.error('Error updating user:', error));
      }).catch(error => console.error('Error finding user:', error));
    }).catch(error => console.error('Error creating user:', error));
  })
  .catch(error => console.error('Database connection error:', error));
