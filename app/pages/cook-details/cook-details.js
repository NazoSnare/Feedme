import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {CookService} from '../../services/cook-service';

@Page({
    templateUrl: 'build/pages/cook-details/cook-details.html'
})
export class CookDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [CookService]];
    }

    constructor(nav, navParams, cookService) {
        this.cookService = cookService;
        this.cook = navParams.get('cook');
    }

    ngOnInit() {
        this.cookService.findById(this.cook.id).subscribe(
            cook => this.cook = cook
        );
    }


}
