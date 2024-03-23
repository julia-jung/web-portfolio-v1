const path = require('path');
const express = require('express');
const hbs = require('hbs');
const mail = require('./utils/mail');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 2000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'portfolio',
    name: 'MINJI JUNG',
  });
});

app.get('/mail', (req, res) => {
  mail(req.query.from, req.query.text, (error, response) => {
    if (error) {
      console.log(error);
      return res.send({ error });
    }
    console.log(response);
    res.send({ response });
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }
  if (req.query.address == 'geolocation') {
    forecast(req.query.lat, req.query.lng, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location: 'in your area',
        address: '',
      });
    });
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    });
  }
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
