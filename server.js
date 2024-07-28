const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const entriesRouter = require('./routes/entries');

const app = express();
const port = 5000;

// MongoDB Connection String
const mongoUri = 'mongodb+srv://aniketabtech22:<password>@wall-of-fame.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/entries', entriesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
