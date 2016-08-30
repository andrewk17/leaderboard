var app = angular.module('leaderboard', []);

app.controller('main', function($scope, $http) {

  $scope.match = {};

  var getAllRankings = function() {
    $http.get('/api/rankings')
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
    $http.post('/api/rankings', { data: $scope.match.winner })
      .then(function(response) {
        $scope.rankings = response.data;
      });
    getAllRankings();
  };

  $scope.addWin = function(ranking) {
    // console.log(ranking);
    $http.post('/api/rankings', { data: ranking.playerName })
      .then(function(response) {
        $scope.rankings = response.data;
        getAllRankings();
      });
  };

  getAllRankings();
});
