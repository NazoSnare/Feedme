import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {CookDetailsPage} from '../cook-details/cook-details';
import {CookService} from '../../services/cook-service';

@Page({
    templateUrl: 'build/pages/cook-list/cook-list.html'
})
export class CookListPage {

    static get parameters() {
        return [[NavController], [NavParams], [CookService]];
    }

    constructor(nav, navParams, cookService) {
        this.nav = nav;
        this.cookService = cookService;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }

    ngOnInit() {
        this.cookService.findAll().subscribe(
            data => this.cooks = data
        );
    }

    itemTapped(event, cook) {
        this.nav.push(CookDetailsPage, {
            cook: cook
        });
    }

}