var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var gasLogSchema = new Schema({
	date: [Date],
	car_odometer: [String],
	quantity: [String], 
	total_price: [String],
	unit_price: [String]
});

module.exports = mongoose.model('gasLogModel', gasLogSchema);