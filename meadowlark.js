var express = require('express'),
    fortune = require('./lib/fortune.js');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// the 'static' middleware has the same effect as
// creating a route for each static file you want
// to deliver that renders a file and returns it
// to the client
app.use(express.static(__dirname + '/public'));

// the view engine returns a content-type of text/html
// and status code of 200 by default
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune() });
});

// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') +
                '; press Ctrl+C to terminate.');
});