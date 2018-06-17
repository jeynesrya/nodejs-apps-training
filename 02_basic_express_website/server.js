var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "xxxxxx@gmail.com",
            pass: "xxxxxx"
        }
    });

    var mailOptions ={
        from: "Ryan <xxxxxx@gmail.com>",
        to: "genericemail@someone.com",
        subject: "Website Submission",
        text: "You have mail.... Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.message,
        html: "<p>You have mail</p>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message sent! ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000);
console.log("Server is running on port 3000");