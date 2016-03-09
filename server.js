var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    meals = require('./server/meal-service'),
    cooks = require('./server/cook-service'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

app.get('/meals', meals.findAll);
app.get('/meals/favorites', meals.getFavorites);
app.get('/meals/:id', meals.findById);
app.post('/meals/likes', meals.like);
app.post('/meals/favorites', meals.favorite);
app.delete('/meals/favorites/:id', meals.unfavorite);

app.get('/cooks', cooks.findAll);
app.get('/cooks/:id', cooks.findById);

app.listen(app.get('port'), function () {
    console.log('Feedme server listening on port ' + app.get('port'));
});