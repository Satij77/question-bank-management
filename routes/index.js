const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    res.render('index'); // Ensure you have an index.ejs file in your views
});

module.exports = router;
