var app = angular.module('gasChartApp', ['ng-fusioncharts']);

	app.controller('testCtrl', function($scope) {
		// chart data source
  		$scope.dataSource = {
    		"chart": {
      			"caption": "Column Chart Built in Angular!",
     			"captionFontSize": "30",
      			// more chart properties - explained later
    		},
    		"data": [{
        		"label": "CornflowerBlue",
        		"value": "42"
      		},]
  		};
	});

	app.controller('formCtrl', [ '$scope', function($scope, $http){
		$scope.gasData = [];
		$scope.quantity = "4";

		$scope.submit = function(){
			$scope.gasData.push(this.quantity);
			console.log(this.quantity);
		};
	}]);
