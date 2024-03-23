const nodemailer = require('nodemailer');
require('dotenv').config();

const mail = (from, text, callback) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mail = {
    from: from, // sender address
    to: 'minji6654@gmail.com', // list of receivers
    subject: from + '이 portfolio를 통해 전송한 메일', // Subject line
    text: text, // plain text body
    html: '<b>From : ' + from + '</b><br><p>' + text + '</p>', // html body
  };

  transporter.sendMail(mail, (err, response) => {
    if (err) {
      callback(err, undefined);
    } else {
      callback(undefined, response);
    }
  });
};

module.exports = mail;
