const router = require('express').Router();
const apiRoutes = require('./api');

// Add prefix of '/api' to all of the api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error: Route not found</h1>');
});

module.exports = router;