angular.module('starter.constants', [])

.constant('FOOD', [{
    "id": 1,
    "name": "Generic Food 1",
    "calories": 777
}, {
    "id": 2,
    "name": "Generic Food 2",
    "calories": 777
}, {
    "id": 3,
    "name": "Generic Food 3",
    "calories": 777
}, {
    "id": 4,
    "name": "Generic Food 4",
    "calories": 777
}])

.constant('Person', function() {
    this.id = "uuid";
    this.name = "Gian"
    this.age = "25";
    this.gender = "male";
    this.backpack = [];
});
