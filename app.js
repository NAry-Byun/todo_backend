const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index'); // Ensure correct path

const app = express();
app.use(bodyParser.json());
app.use('/api', indexRouter); // Use the router middleware here

const mongoURI = 'mongodb://127.0.0.1:27017/todo-demo';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port5000`);
});
