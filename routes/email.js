var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET users listing. */
router.post('/send', function (req, res, next) {
  let to = req.body.to;
  let subject = req.body.subject;
  let body = req.body.body;
  let Options = {
    host: process.env.HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    }
  };
  let mail = {
    from: process.env.FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    //text: "Plain text here",
    html: body, // html body
  };
  let transporter = nodemailer.createTransport(Options);
  transporter.sendMail(mail).then((result) => {
    res.status(200).json({
      status: true,
      result: result.response
    });
  }).catch((reason) => {
    res.status(200).json({
      status: false,
      result: reason
    });
  });
});

module.exports = router;
