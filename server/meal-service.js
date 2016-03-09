var MEALS = require('./mock-meals').data,
    favorites = [];

function findAll(req, res, next) {
    return res.json(MEALS);

};

function findById(req, res, next) {
    var id = req.params.id;
    res.json(MEALS[id - 1]);
}

function getFavorites(req, res, next) {
    res.json(favorites);
}

function favorite(req, res, next) {
    var meal = req.body;
    var exists = false;
    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === meal.id) {
            exists = true;
            break;
        }
    }
    if (!exists) favorites.push(meal);
    res.send("success")
}

function unfavorite(req, res, next) {
    var id = req.params.id;
    for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == id) {
            favorites.splice(i, 1);
            break;
        }
    }
    res.json(favorites)
}

function like(req, res, next) {
    var meal = req.body;
    MEALS[meal.id - 1].likes++;
    res.json(MEALS[meal.id - 1].likes);
}

exports.findAll = findAll;
exports.findById = findById;
exports.getFavorites = getFavorites;
exports.favorite = favorite;
exports.unfavorite = unfavorite;
exports.like = like;