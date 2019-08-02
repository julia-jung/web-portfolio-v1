const nodemailer = require('nodemailer');

const mail = (from, text, callback) => {

    let transporter = nodemailer.createTransport({
        service:"Gmail",
        host:"smtp.gmail.com",
        auth: {
          user: "sharethings1224@gmail.com", 
          pass: "sharethings01@" 
        }
    });
    
    let mail = {
        from: from, // sender address
        to: "minji6654@gmail.com", // list of receivers
        subject: from + "이 portfolio를 통해 전송한 메일", // Subject line
        text: text, // plain text body
        html: "<b>From : " + from + "</b><br><p>" + text + "</p>" // html body
    };
    
    transporter.sendMail(mail, (err, response) => {
        if(err) {
            callback(err, undefined);
        }else {
            callback(undefined, response);
        }
    });
}

module.exports = mail;