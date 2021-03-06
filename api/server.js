// file: server.js
// description: Responsible for connecting the MongoDB and starting the server.

const mongoose = require('mongoose');
require('dotenv').config( { path: './api/.env'});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
});

const app = require('./app');
const database = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Connect to database
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => console.log('DB connection Successfully!'))

// Start the server
const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on port ${port}`))
process.on(`unhandledRejection`, err => {
  console.log('UNHANDLED REJECTION! shutting down...')
  console.log(err.name, err.message)
  server.close(() => process.exit(1))
})