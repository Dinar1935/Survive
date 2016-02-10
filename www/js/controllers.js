angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  //Generate a list of persons for a group

  var chance = new Chance();
  var genders = ["male", "female"];
  $scope.persons = [];

  var Person = function(name, age, gender){
    this.name = chance.name({ gender: gender });
    this.age = chance.age();
    this.gender = gender;
  }

function generatePersons(){
  for (var i = 7 - 1; i >= 0; i--) {
    var r = getRandomIntInclusive(0, 1);
    var p = new Person(undefined, undefined, genders[r]);
    $scope.persons.push(p);
  }
  localStorage.persons = "";
  localStorage.persons = JSON.stringify($scope.persons);
}

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generatePersons();

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.persons = JSON.parse(localStorage.persons);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
