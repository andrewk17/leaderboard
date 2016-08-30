var app = angular.module('leaderboard', []);

app.controller('main', function($scope, $http) {

  var getAllRankings = function() {
    $http.get('/rankings')
      .then(
        function(response) {
          $scope.rankings = response.data;
        }, 
        function(response) {
        // failure call back
        }
      );
  };

  $scope.submit = function() {
    $http.post('/rankings', {data: $scope.match.winner})
    .then(function(response) {
      $scope.rankings = response.data;
    });
    getAllRankings();
  };

  getAllRankings();
});