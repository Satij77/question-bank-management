const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'http://be-sdn.onrender.com/api/quizzes'; // Updated to remove trailing slash

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        res.render('quiz/list', { quizzes: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Create quiz
router.get('/create', (req, res) => {
    res.render('quiz/create');
});

// Handle quiz creation
router.post('/', async (req, res) => {
    try {
        await axios.post(apiUrl, req.body);
        res.redirect('/quizzes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Edit quiz
router.get('/edit/:quizId', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/${req.params.quizId}`); // Ensure quiz ID is valid
        res.render('quiz/edit', { quiz: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle quiz update
router.put('/:quizId', async (req, res) => {
    try {
        await axios.put(`${apiUrl}/${req.params.quizId}`, req.body);
        res.redirect('/quizzes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete quiz
router.delete('/:quizId', async (req, res) => {
    try {
        await axios.delete(`${apiUrl}/${req.params.quizId}`);
        res.redirect('/quizzes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Quiz details route
router.get('/:quizId', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/${req.params.quizId}`);
        const quiz = response.data; // This includes the quiz data with questions

        // Render the details page with quiz data and questions
        res.render('quiz/details', { quiz: quiz });
    } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
            return res.status(404).render('404', { message: 'Quiz not found' });
        }
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
