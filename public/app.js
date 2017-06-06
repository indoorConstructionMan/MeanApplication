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

	app.controller('formCtrl', [ '$scope', '$http', function($scope, $http){
		
    $scope.submit = function(){
      $http.post('/api/gasup', $scope.gasData).then(function(data) {console.log("posted successfully");}, function(data){console.error("error in posting");});

      // console.log("Why am i running?!");
      // console.log(this.gasData.date);
      // console.log(this.gasData.odometer);
      // console.log(this.gasData.quantity);
      // console.log(this.gasData.totalPrice);
      // console.log(this.gasData.unitPrice);    
   }}]);   

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
