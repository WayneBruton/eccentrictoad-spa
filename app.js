const express 			= require("express"),
		bodyParser		= require("body-parser"),
        nodemailer		= require("nodemailer"),
        axios           = require('axios');
        app 			= express();
          
app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const port = 8080 || process.env.PORT;


if (port === 8080) {
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

// pescetarian, lacto vegetarian, ovo vegetarian, vegan, paleo, primal, and vegetarian.

// african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.

//Intolerance

 


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/random', (req, res) => {
    axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=8&instructionsRequired=true", {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log(response.data)
            res.send({
                data: response.data.recipes
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })

});

app.get('/byIngredient/:ingredients', (req, res) => {
    let ingredients = (req.params.ingredients).split(',');
    let updatedIngredients = ingredients.map(str => str.trim());
    let finalIngredients = updatedIngredients.join('%2C');


    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=${finalIngredients}&instructionsRequired=true&number=8&ranking=1`, {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log('This is the response:::::::::', response.data)
            res.send({
                data: response.data
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })

});

// main course, side dish, dessert, appetizer, salad, bread, breakfast, soup, beverage, sauce, or drink.

// dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat.

app.get('/complex/:cuisine/:diet/:ingredients/:mealType/:intolerances', (req, res) => {
    let finalIngredients = '';
    if (req.params.ingredients != 0) {
        let ingredients = (req.params.ingredients).split(',');
        let updatedIngredients = ingredients.map(str => str.trim());
        finalIngredients = updatedIngredients.join('%2C+');
    } else {
        finalIngredients = 0
    }

    
    let diet = req.params.diet;
    let cuisine = req.params.cuisine;
    let mealtype = req.params.mealType;
    let intolerances = req.params.intolerances;
   
    // console.log(finalIngredients);
    // console.log(diet);
    // console.log(cuisine);
    // console.log(mealtype);
    // console.log(intolerances);
    let andArray = [];
    if (cuisine == 0) {
        andArray.push(0)
    } else {
        andArray.push(1)
    }
    if (diet == 0) {
        andArray.push(0)
    } else {
        andArray.push(1)
    }
    if (finalIngredients == 0) {
        andArray.push(0)
    } else {
        andArray.push(1)
    }
    if (intolerances == 0) {
        andArray.push(0)
    } else {
        andArray.push(1)
    }
    if (mealtype == 0) {
        andArray.push(0)
    } else {
        andArray.push(1)
    }

    console.log(andArray);
    let finalAndArray = [];
    const resA = andArray.reduce(function(start, sum){
            start = start + sum;
            finalAndArray.push(start);
            console.log(start);
            return start;      
    },0);
    
    console.log(finalAndArray);

    if (finalAndArray[0] === 0) {
        cuisine = '';
    } else {
        cuisine = 'cuisine=' + cuisine;
    }

    if (finalAndArray[1] === finalAndArray[0]) {
    
        diet = '';
    } else if (finalAndArray[1] > finalAndArray[0] && finalAndArray[0] == 0) {
        diet = 'diet=' + diet;

    } else if (finalAndArray[1] > finalAndArray[0] && finalAndArray[0] > 0) {
        diet = '&diet=' + diet;
    } 

    if (finalAndArray[2] === finalAndArray[1]) {
        
        finalIngredients = '';
    } else if (finalAndArray[2] > finalAndArray[1] && finalAndArray[1] == 0) {
        finalIngredients = 'includeIngredients=' + finalIngredients;
    } else if (finalAndArray[2] > finalAndArray[1] && finalAndArray[1] != 0) {
        finalIngredients = '&includeIngredients=' + finalIngredients;
    } 

    if (finalAndArray[3] === finalAndArray[2]) {
        intolerances = '';
    } else if (finalAndArray[3] > finalAndArray[2] && finalAndArray[2] == 0) {
        intolerances = 'intolerances=' + intolerances;
    } else if (finalAndArray[3] > finalAndArray[2] && finalAndArray[2] != 0) {
        intolerances = '&intolerances=' + intolerances;
    }

    if (finalAndArray[4] === finalAndArray[3]) {
        mealtype = '';
    } else if (finalAndArray[4] > finalAndArray[3] && finalAndArray[3] == 0) {
        mealtype = 'type=' + mealtype;
    } else if (finalAndArray[4] > finalAndArray[3] && finalAndArray[3] != 0) {
        mealtype = '&type=' + mealtype;
    } 
     
    console.log(finalIngredients);
    console.log(diet);
    console.log(cuisine);
    console.log(mealtype);
    console.log(intolerances);
    // console.log(sortFinalString);
    // let searchString = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?cuisine=french&diet=vegetarian&includeIngredients=sole%2C+lettuce%2C+tomato&intolerances=dairy&type=main+course&instructionsRequired=true&limitLicense=true&offset=0&number=4`
    let searchString = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?${cuisine}${diet}${finalIngredients}${intolerances}${mealtype}&instructionsRequired=true&limitLicense=true&offset=0&number=8`
    console.log(searchString);
// console.log(calc)


  


    axios.get(searchString, {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            console.log('This is the response:::::::::', response.data)
            res.send({
                data: response.data

            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })

});


app.get('/byID/:recipeID', (req, res) => {
    let recipeID = req.params.recipeID;
    console.log('recipeID is', recipeID);
    // "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information"
    // axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information`, {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`, {
            headers: {
                "X-Mashape-Key": "NHQhNE8G4NmshQgS461o7JONR3iZp12wO9sjsnZxrvUASkwriI",
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
            }
        })
        .then(response => {
            // console.log('This is the response:::::::::', response.data)
            res.send({
                data: response.data
            });
        })
        .catch(response => {
            res.send({
                data: 'Error with Connection'
            })
        })
});



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

app.get('/register', function(req, res){
    res.render('register');
})

app.get('/login', function(req, res){
    res.render('login');
})


app.listen(port, process.env.IP, function(){
    console.log('Server has started....');
});