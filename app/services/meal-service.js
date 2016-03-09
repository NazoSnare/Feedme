import {Injectable} from 'angular2/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let favorites = [],
    mealsURL = SERVER_URL + 'meals/',
    favoritesURL = mealsURL + 'favorites/',
    likesURL = mealsURL + 'likes/';

@Injectable()
export class MealService {

    static get parameters() {
        return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(mealsURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getFavorites() {
        return this.http.get(favoritesURL)
            .map(res => res.json())
            .catch(this.handleError);
    }

    like(meal) {
        let body = JSON.stringify(meal);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(likesURL, body, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    favorite(meal) {
        let body = JSON.stringify(meal);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(favoritesURL, body, options)
            .catch(this.handleError);
    }

    unfavorite(meal) {
        return this.http.delete(favoritesURL + meal.id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}