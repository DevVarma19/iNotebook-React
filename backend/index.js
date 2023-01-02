const express = require('express')

const connectToMongo = require('./db');
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})