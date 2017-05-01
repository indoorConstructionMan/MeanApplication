var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

mongoose.connect('localhost:27017');
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json' }));
app.use(methodOverride());


var router = express.Router();

router.get('/', function(req,res){
    res.sendFile('index.html');
});

router.get('/gaslog', function(req,res){
    res.json({ name: "Aaron"});
});

router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});

app.use('/', router);

app.listen(8080);
console.log('Server on port 8000');
