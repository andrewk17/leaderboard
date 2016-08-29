var app = angular.module('leaderboard', []);

app.controller('main', function($scope) {
  $scope.players = {
    Andrew: 5,
    Sean: 0
  },
  $scope.submit = function() {
    $scope.players[$scope.match.winner]++;
  };
});