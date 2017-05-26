var app = angular.module('gasChartApp', ['ng-fusioncharts', 'ui.router']);

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


	app.config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]);

	app.config(function($stateProvider, $urlRouterProvider) {

    	$urlRouterProvider.otherwise('/gasup');

    	$stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('gasup', {
            url: '/gasup',
            templateUrl: 'snippet-gasForm.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('chartview', {
            // we'll get to this in a bit       

            url: '/chartview',
            templateUrl: 'snippet-chart.html'
        });

});
