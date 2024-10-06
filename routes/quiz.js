const https = require('https');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'https://localhost:5000/api';  // Your Assignment 01 API URL

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

// GET: List of Quizzes
router.get('/', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render('quiz/list', { quizzes: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET: Create Quiz Form
router.get('/create', (req, res) => {
  res.render('quiz/create');
});

// POST: Create a New Quiz
router.post('/create', async (req, res) => {
  try {
    await axiosInstance.post(`${apiUrl}/quizzes`, req.body);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// GET: Edit Quiz Form
router.get('/edit/:id', async (req, res) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/quizzes/${req.params.id}`);
    res.render('quiz/edit', { quiz: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT: Update Quiz
router.put('/edit/:id', async (req, res) => {
  try {
    await axiosInstance.put(`${apiUrl}/quizzes/${req.params.id}`, req.body);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE: Delete Quiz
router.delete('/delete/:id', async (req, res) => {
  try {
    await axiosInstance.delete(`${apiUrl}/quizzes/${req.params.id}`);
    res.redirect('/quizzes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
