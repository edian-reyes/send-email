var express = require('express')
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email',
    pass: 'password'
  }
})
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000

var app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/js'))
app.use(express.static(__dirname + '/node_modules'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
})


app.get('/', function(req, res) {
  res.sendfile('index.html')
  res.end()
})

app.post('/sendemail', function(req, res) {
  var mailData = {
    fullName: req.body.fullName,
    email: req.body.email,
    message: req.body.message
  }

  transporter.sendMail({
    from: mailData.email,
    to: 'edian.reyes92@gmail.com',
    subject: 'test email tut',
    html: `<h2>Name: ${mailData.fullName}</h2>
           <h2>Email: ${mailData.email}</h2>
           <h2>Message: ${mailData.message}</h2>`,
    text: 'Text from server'
  })
  .then(function(result){
    console.log("Success: " + result.response);
  })
  .catch(function(error) {
    console.log("Error: " + error);
  })

  transporter.close()
})
