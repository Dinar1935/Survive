angular.module('starter.constants', [])

.constant('FOOD', [{
    "id": "f1",
    "name": "Pan",
    "img": "img/Food/SR-icon-food-BraidedBread.png",
    "calories": 777
}, {
    "id": "f2",
    "name": "Pollo",
    "img": "img/Food/SR-icon-food-ChickenBreast.png",
    "calories": 777
}, {
    "id": "f3",
    "name": "Cerveza",
    "img": "img/Food/SR-icon-food-Ale.png",
    "calories": 777
}])

.constant('Person', function() {
    this.id = "uuid";
    this.name = "Gian"
    this.age = "25";
    this.gender = "male";
    this.backpack = {
        "food": [{
            "f1": 10,
            "f2": 10,
            "f3": 10
        }],
        "tools": []
    }
});