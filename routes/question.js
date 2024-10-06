const express = require('express');
const https = require('https');
const router = express.Router();
const axios = require('axios');

// URL of your API
const apiUrl = 'https://localhost:5000/api/questions'; // Update with your backend URL

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Disable SSL verification
});

// List all questions
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}/question`);
    res.render('questions/list', { questions: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Add new question
router.get('/create', (req, res) => {
  res.render('questions/create');
});

// Handle new question creation
router.post('/', async (req, res) => {
  try {
    await axios.post(`${apiUrl}/question`, req.body);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Edit question
router.get('/edit/:questionId', async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}/question/${req.params.questionId}`);
    res.render('questions/edit', { question: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update question
router.put('/:questionId', async (req, res) => {
  try {
    await axios.put(`${apiUrl}/question/${req.params.questionId}`, req.body);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete question
router.delete('/:questionId', async (req, res) => {
  try {
    await axios.delete(`${apiUrl}/question/${req.params.questionId}`);
    res.redirect('/questions');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Question details
router.get('/:questionId', async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}/question/${req.params.questionId}`);
    res.render('questions/details', { question: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
