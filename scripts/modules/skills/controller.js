(function() {
  /**
   * Skills controller
   */
  angular.module("application").controller("skillsController", function($scope, $http) {
    $http.get('data/skills.json')
    .then(function(skills) {
      $scope.skills = skills.data;
    });
  });

})();
