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

  var getRanksAndMsgs = function() {
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
  //   getRanksAndMsgs();
  // };

  $scope.addPlayer = function() {
    $http.post('api/players', { data: $scope.match.newPlayer })
    .then(function(response) {
      getRanksAndMsgs();
      $scope.match.newPlayer = '';
    });
  };

  $scope.addWin = function(ranking) {
    $http.post('/api/rankings', { data: ranking.playerName })
      .then(function(response) {
        getRanksAndMsgs();
      });
  };

  getRanksAndMsgs();
  // getAllMessages();
});
