const express = require('express');
const router = express.Router();

// Import quiz and question routes
const quizRoutes = require('./quiz');
const questionRoutes = require('./question');

// Use the routes
router.use('/quizzes', quizRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
