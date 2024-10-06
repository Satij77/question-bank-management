const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'https://be-sdn.onrender.com/api/questions'; // Replace with your actual API URL

// Get all questions for a quiz
router.get('/quizzes/:quizId', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/quizzes/${req.params.quizId}`);
        res.render('questions/list', { questions: response.data, quizId: req.params.quizId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Create question
router.get('/quizzes/:quizId/create', (req, res) => {
    res.render('questions/create', { quizId: req.params.quizId });
});

// Handle question creation
router.post('/quizzes/:quizId', async (req, res) => {
    try {
        await axios.post(`${apiUrl}/quizzes/${req.params.quizId}/question`, req.body);
        res.redirect(`/questions/quizzes/${req.params.quizId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Edit question
router.get('/edit/:questionId', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/${req.params.questionId}`);
        res.render('questions/edit', { question: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle question update
router.put('/edit/:questionId', async (req, res) => {
    try {
        await axios.put(`${apiUrl}/${req.params.questionId}`, req.body);
        res.redirect(`/questions/${req.params.questionId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete question
router.delete('/:questionId', async (req, res) => {
    try {
        await axios.delete(`${apiUrl}/${req.params.questionId}`);
        res.redirect('/questions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
