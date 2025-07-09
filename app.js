const express = require('express');
const app = express();
const path =require('path')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.render('index'); // renders views/index.ejs
});
app.get('/index', (req, res) => {
  res.render('index'); // renders views/index.ejs
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/service', (req, res) => {
  res.render('service');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
