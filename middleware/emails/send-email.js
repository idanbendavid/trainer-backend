const config = require("../../config.json");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport(
    config.development.outgoingEmail
    // using mailtrap as fake email service
);

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

transporter.use('compile', hbs(handlebarOptions));

function sendRegisterEmail(email) {
    let mailOptions = {
        from: '"trainer" <smtp.mailtrap.io>', 
        to: email,
        subject: 'Glad To Have You On Board',
        text: 'thanks',
        template: 'register'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })
}


module.exports = {
    sendRegisterEmail,
}

