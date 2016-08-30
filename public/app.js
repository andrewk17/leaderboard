var app = angular.module('leaderboard', []);

app.controller('main', function($scope, $http) {

  $scope.match = {};

  var getAllMessages = function() {
    $http.get('/api/messages')
    .then( function(response) {
      $scope.messages = response.data;
    },
    function(response) {

    });
  };

  var getAllRankings = function() {
    $http.get('/api/rankings')
      .then(
        function(response) {
          $scope.rankings = response.data;
          getAllMessages();
        },
        function(response) {
          // failure call back
        }
      );
  };

  // $scope.submit = function() {
  //   $http.post('/api/rankings', { data: $scope.match.winner })
  //     .then(function(response) {
  //       $scope.rankings = response.data;
  //     });
  //   getAllRankings();
  // };

  $scope.addPlayer = function() {
    $http.post('api/players', { data: $scope.match.newPlayer })
    .then(function(response) {
      getAllRankings();
      $scope.match.newPlayer = '';
    });
  };

  $scope.addWin = function(ranking) {
    // console.log($event);
    $http.post('/api/rankings', { data: ranking.playerName })
      .then(function(response) {
        $scope.rankings = response.data;
        getAllRankings();
      });
  };

  getAllRankings();
  // getAllMessages();
});
