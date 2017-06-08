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

  app.controller('gaslogsCtrl', ['$scope', '$http', function($scope, $http){
    
    $http.get('/api/gasup').then(function(data) {
      console.log(data.data);
      $scope.logs = data.data;
      console.log("Got the data");
    }, function(data){console.error("did not get data");});

    $scope.deleteLog = function(log_id){
      $http.delete('/api/gasup', {id: log_id})
      .then(function(response){console.log("Success");}, function(response){console.log("Epic fail");})};

  }]);

	app.controller('formCtrl', [ '$scope', '$http', function($scope, $http){
		
    $scope.submit = function(){
      $http.post('/api/gasup', $scope.gasData).then(function(data) {console.log(data.data);console.log("posted successfully");}, function(data){console.error("error in posting");});   
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
