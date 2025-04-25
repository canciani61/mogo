const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Add prefix of '/users' to created routes
router.use('/users', userRoutes);
// Add prefix of '/thoughts' to created routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;