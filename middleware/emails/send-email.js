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
        from: '"Care2fitness" <smtp.mailtrap.io>', 
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

function recievedUserComplaint(email, firstName, lastName){
    let mailOptions = {
        from: '"Care2fitness" <smtp.mailtrap.io>', 
        to: email,
        subject: `${firstName + " " + lastName} complaint`,
        text: 'we recieved your complaint',
        template: 'complaint'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    })
}

function updateUserPassword(email){
    let mailOptions = {
        from: '"Care2fitness" <smtp.mailtrap.io>', 
        to: email,
        subject: `Care2fitness password been changed`,
        text: 'password has been updated',
        template: 'newPassword'
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
    recievedUserComplaint,
    updateUserPassword
}

