angular.module('starter.controllers', [])

.controller('JanusCtrl', function($state, $scope, $ionicHistory) {
    $scope.$on('$ionicView.beforeEnter', function(e) {
        var isSKLogged = localStorage.getItem("persons");
        if (isSKLogged !== null) {
            $state.go('tab.dash');
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            console.log('Tiene un personaje creado, vamos a la pantalla principal');
        } else {
            console.log('preelse');
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            console.log($ionicHistory);
            console.log('postelse');
            $state.go('create');
        }
    });
})

.controller('CreateCtrl', function($scope, $state, Person) {
    $scope.data = {};
    $scope.data.gender = "male";

    $scope.createCharacter = function() {
        var chance = new Chance();
        var p = new Person();
        p.id = chance.guid();
        p.name = $scope.data.name;
        p.age = $scope.age;
        p.gender = $scope.data.gender;
        localStorage.clear();
        localStorage.persons = JSON.stringify([p]);
        $state.go('tab.dash');
    }
})

.controller('DashCtrl', function($scope, Person, $interval) {

    //Generate a list of persons for a group
    var chance = new Chance();
    var genders = ["male", "female"];
    $scope.persons = [];
    $scope.testing = 7200;

    $scope.reiniciarTodo = function(){
        $scope.testing = 7200;
    }

    $interval(function () {
        $scope.testing = $scope.testing - 3;
    }, 3000)

    function generatePersons() {
        for (var i = 7 - 1; i >= 0; i--) {
            var r = getRandomIntInclusive(0, 1);
            var p = new Person();
            p.id = chance.guid();
            p.name = chance.name({
                gender: genders[getRandomIntInclusive(0, 1)]
            });
            p.age = chance.age();
            p.gender = genders[getRandomIntInclusive(0, 1)];
            p.backpack = [];
            $scope.persons.push(p);
        }
        localStorage.persons = "";
        localStorage.persons = JSON.stringify($scope.persons);
    }

    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //generatePersons();
})

.controller('ChatsCtrl', function($scope, $state, FOOD) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //

    $scope.persons = [];

    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //$scope.$on('$ionicView.enter', function(e) {
    $scope.persons = JSON.parse(localStorage.persons);
    //});

    $scope.goSearch = function() {
        console.log('Going to search, Create random');
        $scope.persons = JSON.parse(localStorage.persons);
        var comidaEncontrada = FOOD[getRandomIntInclusive(0, (FOOD.length - 1))];
        console.log('Find ', comidaEncontrada);
        var mochila = $scope.persons[0].backpack.food[0];
        var alimentoAumentar = mochila[comidaEncontrada.id];
        console.log('La comida en la mochila es: ', $scope.persons[0].backpack.food[0]);
        console.log('Vamos a aumentar: ', alimentoAumentar);
        alimentoAumentar++;
        mochila[comidaEncontrada.id] = alimentoAumentar;
        $scope.persons[0].backpack.food[0] = mochila;
        localStorage.persons = JSON.stringify($scope.persons);
    };
    $scope.viewBackpack = function(personId) {
        console.log('Going to viewBackPack: ', personId);
        $state.go('tab.backpack-detail');
    };
})

.controller('PersonBackpackCtrl', function($scope, $stateParams, PersonFactory) {
    $scope.person = PersonFactory.get($stateParams.personId);
})

.controller('BackpackDetailCtrl', function($scope, $stateParams, FOOD) {
    $scope.backpack = JSON.parse(localStorage.persons)[0].backpack.food[0];
    console.log('Detalle de mochila:', $scope.backpack);
    $scope.FOOD = FOOD;
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});