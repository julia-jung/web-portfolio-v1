const path = require('path');
const express = require('express');
const hbs = require('hbs');
const mail = require('./utils/mail');

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
    title:'portfolio',
    name:'MINJI JUNG'
  });
});

app.get('/mail', (req, res) => {

    mail(req.query.from, req.query.text, (error, response) => {
        if(error) {
            console.log(error);
            return res.send({ error });
        }
        console.log(response);
        res.send({ response });
    })
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});