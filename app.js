const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as default view engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set EJS as another template engine for specific pages
app.set('view engine', 'ejs');

// Routes
const indexRoutes = require('./routes/index');
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/question');

app.use('/', indexRoutes);
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
