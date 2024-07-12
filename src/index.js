const express = require('express');
const app = express();
const cors = require('cors');

const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');

const { connect } = require('./config/database');
const apiRoutes = require('./routes/index');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to handle URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// API routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server Started at PORT ${PORT}`);
  await connect();
});
