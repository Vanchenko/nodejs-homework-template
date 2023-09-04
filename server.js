const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const errorHandler = require("./middlewares/errorHandler");
const usersRoutes = require('./routes/usersRoutes');
const contactsRoutes = require('./routes/contactsRoutes');
require('colors');
require('dotenv').config({ path: './.env' });
const connectionDB = require('./connectDB');
const PORT = process.env.PORT;


const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use(express.json());
app.use(cors());
app.use(express.static('public'))
app.use('/users', usersRoutes);
app.use('/api', contactsRoutes);

app.use(errorHandler);

connectionDB();
  app.listen(PORT, () => {
    console.log(`Database connection successful! Server running on port: ${PORT}`.green.italic.bold);
  });



