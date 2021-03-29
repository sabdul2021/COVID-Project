var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false,
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'mymail@outlook.com',
        pass: 'myPassword'
    }
});

// setup e-mail data,
var mailOptions = {
    from: '"Our Code World " <mymail@outlook.com>', // sender address (who sends)
    to: 'mymail@mail.com, mymail2@mail.com', // list of receivers (who receives)
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<!-- payload to be inserted here -->  // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
