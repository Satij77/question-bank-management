const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/question');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public')); // Serve static files

// Set up Handlebars as the main view engine
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');



// Routes
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index'); // This should match your view filename
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
