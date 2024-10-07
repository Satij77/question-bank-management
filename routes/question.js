const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'http://localhost:5000/api'; // Update with the correct API URL

// Create Axios instance with HTTPS agent
const axiosInstance = axios.create({
  httpsAgent: new require('https').Agent({ rejectUnauthorized: false })
});

// List all questions
router.get('/', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/questions`);
    res.render('questions/list', { questions: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// View question details by ID
router.get('/:questionId', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/questions/${req.params.questionId}`);
    res.render('questions/details', { question: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Show create question form
router.get('/new', (req, res) => {
  res.render('questions/create');
});

// Create new question
router.post('/', async (req, res) => {
  try {
    await axiosInstance.post(`${apiUrl}/questions`, req.body);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Show edit question form
router.get('/:questionId/edit', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/questions/${req.params.questionId}`);
    res.render('questions/edit', { question: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update question by ID
router.put('/:questionId', async (req, res) => {
  try {
    await axiosInstance.put(`${apiUrl}/questions/${req.params.questionId}`, req.body);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete question by ID
router.delete('/:questionId', async (req, res) => {
  try {
    await axiosInstance.delete(`${apiUrl}/questions/${req.params.questionId}`);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
