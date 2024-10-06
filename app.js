const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars as the main view engine
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/question');
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('partials/index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
