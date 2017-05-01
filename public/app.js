var app = angular.module('gas-log', [])

app.controller('testCtrl', function($scope, $http) {
    $scope.data = [];
    var request = $http.get('/gaslog');

    request.success(function(data) {
        $scope.data = data;
    });

    request.error(function(data){
        console.log('Error: ' + data);
    });
});
