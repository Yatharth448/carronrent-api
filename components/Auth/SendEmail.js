"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.carronrent.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'support@carronrent.com',
    pass: 'support@4321'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function send(header,toEmail, subject, otp) {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `${header} support@carronrent.com`, // sender address
      to: `${toEmail}`, // list of receivers
      subject: `${subject}`, // Subject line
      text: `Hi, One time password is ${otp}, This OTP is valid for 10 minutes.`, // plain text body
      html: `<b>Hi, One time password is ${otp}, This OTP is valid for 10 minutes.</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return info
    
  } catch (error) {
    
    throw error
  }
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}



exports.default = send