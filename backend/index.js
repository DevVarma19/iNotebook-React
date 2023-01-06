const express = require('express')
const cors = require('cors');

const connectToMongo = require('./db');
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})