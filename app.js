const express 			= require("express"),
		bodyParser		= require("body-parser"),
        nodemailer		= require("nodemailer"),
        app 			= express();
          
app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000 || process.env.PORT;


if (port === 3000) {
	require('dotenv/config');
  }

app.use(require("cookie-session")({
	secret: "Chester is awesome",
	resave: false,
	saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/water", function(req, res){
	res.render("water");
});

app.get("/news", function(req, res){
	res.render("news");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/send-email', (req,res) => {

    let response = {
        success : 'Subscribed!',
        failure: 'There was a problem'
    }
    let firstName = req.body.subscribeInfo.Cname;
    let email = req.body.subscribeInfo.Cemail;
    let tel = req.body.subscribeInfo.Cphone;
    let message = req.body.subscribeInfo.Cmessage;
	const output = `
	<p>You have a new contact request</p>
	<h3>Contact Details</h3>
	<ul>
		<li>Name: ${firstName}</li><br>

		<li>Email: ${email}</li><br>
		<li>Telephone: ${tel}</li><br>

	</ul><br>
	<h3>Message</h3><br>
	<p>${message}</p>
	`;
	let transporter = nodemailer.createTransport({

        host: "mail.eccentrictoad.com",
        port: 465, //587

        secure: true,
        auth: {

            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD

        },
				tls: {
					rejectUnauthorized:false
				}
    });

    let mailOptions = {
        from: '"Treehouse Contact Form" <lwayne@eccentrictoad.com>', 
        to: 'wayne@eccentrictoad.com, waynebruton@icloud.com',
        subject: 'Eccentric Toad Contact Request',
        text: 'Hello world?', 
        html: output 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {			
        res.end(JSON.stringify(response.failure));
        }
        res.end(JSON.stringify(response.success));
    });
});


app.listen(port, process.env.IP, function(){
    console.log('Server has started....');
});