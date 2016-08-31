angular.module('leaderboard').controller('analytics', function($scope) {
  var getMessages = function(limit) {
    // var param1 = $routeParams.id;
    console.log('yooo', param1);
    $http.get('/api/messages', {params: {limit:20}})
      .then(function(response) {
        $scope.messages = response.data;
      },
        function(response) {

        });
  };

  $scope.initialize = function() {
    console.log('yo');
  };

  getMessages();
});