var COOKS = require('./mock-cooks').data;

function findAll(req, res, next) {
    return res.json(COOKS);

};

function findById(req, res, next) {
    var id = req.params.id;
    res.json(COOKS[id - 1]);
}

exports.findAll = findAll;
exports.findById = findById;