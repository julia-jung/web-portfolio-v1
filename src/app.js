const path = require('path');
const express = require('express');
const nodemailer = require("nodemailer");
const hbs = require('hbs');


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

// async..await is not allowed in global scope, must use a wrapper
// async function main(){

// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// //let testAccount = await nodemailer.createTestAccount();

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
// host: "smtp.ethereal.email",
// port: 587,
// secure: false, // true for 465, false for other ports
// auth: {
//   user: "sharething1224@gmail.com", // generated ethereal user
//   pass: "sharethings01@" // generated ethereal password
// }
// });

// // send mail with defined transport object
// let info = await transporter.sendMail({
// from: '"Fred Foo 👻" <foo@example.com>', // sender address
// to: "minji6654@gmail.com", // list of receivers
// subject: "Hello ✔", // Subject line
// text: "Hello world?", // plain text body
// html: "<b>Hello world?</b>" // html body
// });

// console.log("Message sent: %s", info.messageId);
// // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// // Preview only available when sending through an Ethereal account
// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});