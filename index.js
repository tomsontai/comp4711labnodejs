let express = require('express');  
let app = express();
var fs = require("fs");  


var bodyParser = require('body-parser');
var multer = require('multer');
let path = require('path');

const expressHbs = require('express-handlebars');

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let playerRoutes = require('./routes/artists');



app.use(express.static('public'));


  // Custom 500 Page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);

    // Point at the 500.handlebars view
    res.render('partials/500');
});


app.use(playerRoutes);

 app.listen(port, () => console.log('Server ready'));
