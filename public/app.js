var app = angular.module('leaderboard', []);

app.controller('main', function($scope, $http) {
  // $scope.players = {
  //   Andrew: 5,
  //   Sean: 0
  // },
  $scope.submit = function() {
    $scope.players[$scope.match.winner]++;
  };


  var initializeRankings = function() {
    console.log('initializing rankings');
    // $http({
    //   method: 'GET',
    //   url: '/rankings'
    // }).then(function(err, resp) {
    //   debugger;
    //   $scope.players = resp.data;
    //   console.log(resp);
    //   console.log($scope.players);
    //   console.log('then function');
    // });
    $http.get('/rankings')
      .then(
        function(response) {
        // success callback
          // debugger;
          $scope.rankings = response.data;
          console.log(response);
          console.log($scope.players);
          console.log('then function');
        }, 
        function(response) {
        // failure call back
        }
      );
  };

  initializeRankings();
});