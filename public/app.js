var app = angular.module('gasChartApp', ['ng-fusioncharts', 'ui.router', 'ui.materialize']);

  // Used factory to be able to pass data between controllers/views.
  app.factory('logService', [ '$http', function($http) {

    var savedData = {}
    function set(data) {
          savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
      set: set,
      get: get
    }

  }]); 

	app.controller('testCtrl', ['$scope', 'logService', function($scope, logService) {

      //gathering data requirements
		  var mockdata = [
        // example -> {"label":"Date 1, Date 2", "value":"3.25"}
      ];    

      $scope.DATA = logService.get();

      if($scope.DATA != null){
        console.log($scope.DATA);
        for (var i = 0; i < $scope.DATA.length-1; i++){
          var odometer, logDate, odometer_temp, date_temp, cost;
          for (var name in $scope.DATA[i]){
            if (name == "car_odometer"){
              odometer_temp = $scope.DATA[i+1][name][0];
              odometer = $scope.DATA[i][name][0];
            }
            if (name == "date"){
              date_temp = $scope.DATA[i+1][name][0].substr(0,10);
              logDate = $scope.DATA[i][name][0].substr(0,10);
            }
            if (name == "total_price"){
              cost = $scope.DATA[i][name][0];
            }
          }
          var kilometers_driven = odometer_temp - odometer;

          mockdata.push({"label": logDate + " to " + date_temp, "value": Math.round(cost/kilometers_driven * 10000)/100}); 
        }
      };
      // defining data layout and naming
  		$scope.dataSource = {
    		"chart": {
      		"caption": "Fuel Efficiency",
     			"captionFontSize": "30",
          "xAxisName": "Time Period",
          "yAxisName": "Dollars per 100 kilometer [$/100 km]",
          "paletteColors": "#0075c2",
          "valueFontColor": "#ffffff",
          "baseFont": "Helvetica Neue,Arial",
          "captionFontSize": "14",
          "subcaptionFontSize": "14",
          "subcaptionFontBold": "0",
          "placeValuesInside": "1",
          "rotateValues": "0",  
          "divlineColor": "#999999",               
          "divLineIsDashed": "1",
          "divlineThickness": "1",
          "divLineDashLen": "1",
          "divLineGapLen": "1",
          "canvasBgColor": "#ffffff"
    		},
    		"data": mockdata
  		}; 
	}]);  

  app.controller('gaslogsCtrl', ['$scope', '$http', 'logService', '$state', function($scope, $http, logService, $state){
    
    // get all the logs
    $http.get('/api/gasup').then(function(data) {
      console.log(data.data);
      $scope.logs = data.data;
      logService.set(data['data']);
    }, function(data){console.error("did not get data");});

    // delete the log that was clicked
    $scope.deleteLog = function(log_id){
      if(confirm("Are you sure you want to delete this gas log?") == true){
        $http.delete('/api/gasup', {params: {id: log_id}})
        .then(function(response){
          $state.go('listview', {}, {reload: "listview"});
          console.log("Success");
        }, function(response){
          console.log("Epic fail");}
        )}; 
      };

    $scope.editLog = function(log_id){
      console.log("Hello from " + log_id);
      $scope.showDiv = !$scope.showDiv;
    };

    $scope.cancelUpdateLog = function(log_id){
      $scope.showDiv = !$scope.showDiv;
    };

  }]);

 
	app.controller('formCtrl', [ '$scope', '$http', function($scope, $http){
		
    // post and create data point
    $scope.submit = function(){
      $http.post('/api/gasup', $scope.gasData).then(
          function(data) {
            $state.go('gasup', {}, {reload: "gasup"});
            Materialize.toast("Log saved.", 1500);
            console.log("posted successfully");}, 
          function(data){
            Materialize.toast("Log not saved.", 1500);
            console.error("error in posting");}
          );   
   }}]);   

	app.config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]);

  // Angular routing using ng-view
	app.config(function($stateProvider, $urlRouterProvider) {

    	$urlRouterProvider.otherwise('/gasup');

    	$stateProvider

        .state('gasup', {
            url: '/gasup',
            templateUrl: 'snippet-gasForm.html'
        })

        .state('listview', {
            url: '/listview',
            templateUrl: 'snippet-viewList.html',
        })

        .state('chartview', {
            url: '/chartview',
            templateUrl: 'snippet-chart.html'
        });

});
