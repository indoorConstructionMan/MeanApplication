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

        .state('gasup', {
            url: '/gasup',
            templateUrl: 'snippet-gasForm.html'
        })

        .state('listview', {
            url: '/listview',
            templateUrl: 'snippet-viewList.html'
        })

        .state('chartview', {
            url: '/chartview',
            templateUrl: 'snippet-chart.html'
        });

});
