const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'http://localhost:5000/api'; // Update with the correct API URL

// Create Axios instance with HTTPS agent
const axiosInstance = axios.create({
  httpsAgent: new require('https').Agent({ rejectUnauthorized: false })
});

// List all quizzes
router.get('/', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render('quiz/list', { quizzes: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// View quiz details by ID
router.get('/:quizId', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes/${req.params.quizId}`);
    res.render('quiz/details', { quiz: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Show create quiz form
router.get('/new', (req, res) => {
  res.render('quiz/create');
});

// Create new quiz
router.post('/', async (req, res) => {
  try {
    await axiosInstance.post(`${apiUrl}/quizzes`, req.body);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Show edit quiz form
router.get('/:quizId/edit', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes/${req.params.quizId}`);
    res.render('quiz/edit', { quiz: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update quiz by ID
router.put('/:quizId', async (req, res) => {
  try {
    await axiosInstance.put(`${apiUrl}/quizzes/${req.params.quizId}`, req.body);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete quiz by ID
router.delete('/:quizId', async (req, res) => {
  try {
    await axiosInstance.delete(`${apiUrl}/quizzes/${req.params.quizId}`);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
