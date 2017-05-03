// Includes express package, initializes express.
var express = require('express'),
	app = express();

var bodyParser = require('body-parser');

 
app.use('/fc', express.static(__dirname + '/node_modules/fusioncharts'));
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/ng', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('*', function(req, res) {
    res.sendFile(__dirname +'/public/index.html');
});


app.listen(8080);
console.log("Server listening...");
