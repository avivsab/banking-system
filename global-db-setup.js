const mongoose = require('mongoose');
import UserModel from './models/users.model.js';
import AccountModel from './models/account.model.js';
import config from './core/config/config.dev.js';

async function setupDatabase() {
  try {
    await mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Mock users
    const usersData = [
      {
        username: 'user_basic',
        password: '1234',
        accountLevel: 'Basic',
      },
      {
        username: 'user_silver',
        password: 'password123',
        accountLevel: 'Silver',
      },
      {
        username: 'user_gold',
        password: 'P@ssw0rd#123',
        accountLevel: 'Gold',
      },
    ];

    
    for (const userData of usersData) {
      const newUser = new UserModel(userData);
      await newUser.save();
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up the database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

setupDatabase();
