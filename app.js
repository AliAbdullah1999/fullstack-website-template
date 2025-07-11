const express = require('express');
const fs = require('fs').promises; // Use promises for async file operations
const app = express();
const path =require('path')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
async function saveFormData(name, email, message) {
  const data = { name, email, message, timestamp: new Date().toISOString() };
  const filePath = path.join(__dirname, 'formData.json');

  try {
    // Read existing data
    let existingData = [];
    try {
      const fileContent = await fs.readFile('data.txt', 'utf8');
      if (fileContent) {
        existingData = JSON.parse(fileContent);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error; // Ignore if file doesn't exist
    }

    // Append new data
    existingData.push(data);

    // Write updated data back to file
    await fs.writeFile('data.txt', JSON.stringify(existingData, null, 2));
  } catch (error) {
    console.error('Error saving form data:', error);
    throw error;
  }
}

// Route for form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await saveFormData(name, email, message);
    res.redirect('/contact'); // Redirect to the contact page after submission
  } catch (error) {
    res.status(500).send('Error saving form data');
  }
});

app.post('/index', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await saveFormData(name, email, message);
    res.redirect('/index');
  } catch (error) {
    res.status(500).send('Error saving form data');
  }
}); 
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
