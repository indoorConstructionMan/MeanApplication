// Includes express package, initializes express.
var express = require('express'),
	app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
 
app.use('/fc', express.static(__dirname + '/node_modules/fusioncharts'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ng', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect('localhost:27017');
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var gasLogSchema = new Schema({
	date: [Date],
	car_odometer: [String],
	quantity: [String], 
	total_price: [String],
	unit_price: [String]
});

var gasLogModel = mongoose.model('gasLogModel', gasLogSchema);


var router = express.Router();

router.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

router.post('/api/test/', function(req, res){
	console.log(req.body.odometer);
	res.send('Hello from api');
});


app.use('/api', router);

app.listen(8080);
console.log("Server listening...");
