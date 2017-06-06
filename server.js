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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var gasup = require('./models/gas');


var router = express.Router();

router.use(function(req, res, next){
	console.log('Something here');
	next();
});

router.route('/gasup')
	.post(function(req, res){

		var gaslog = new gasup();

		gaslog.date = new Date();
		gaslog.car_odometer = 2123;

		gaslog.save(function(err){
			if(err){
				res.send(err);
			}

			res.json({message: 'Log Created'});
		});
	})
	.get(function(req, res) {
        gasup.find(function(err, logs) {
            if (err)
                res.send(err);

            res.json(logs);
        });
    });

app.use('/api', router);

app.listen(8080);
console.log("Server listening...");
