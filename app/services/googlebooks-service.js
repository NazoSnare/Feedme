import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

@Injectable()
export class GooglebooksService {

    static get parameters() {
        return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    getBookInfoFromISBN(isbn) {
        return this.http.get(API_URL + isbn)
            .map(res => res.json())
            .map(res => res.totalItems ? res.items[0] : null)
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}