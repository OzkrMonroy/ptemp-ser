const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('The database connection has been success');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDB;