var app = angular.module('leaderboard', ['ngRoute']);

app.controller('leaderboard', function($scope, $http, $location) {

  $scope.match = {};

  var getAllMessages = function() {
    $http.get('/api/messages', {params: {limit:10}})
      .then(function(response) {
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

  $scope.goToAnalytics = function(ranking) {
    // console.log(ranking._id);
    $location.path('/analytics/' + ranking._id);
  };

  $scope.routeHome = function() {
    $location.path('/');
  };

  getRanksAndMsgs();
});


app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'leaderboard.html'
    })
    .when('/analytics:id', {
      templateUrl: 'analytics.html',
      controller: 'analytics'
    });
});
