const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// Start server after DB connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});