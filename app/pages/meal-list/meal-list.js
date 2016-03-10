import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {MealDetailsPage} from '../meal-details/meal-details';
import {MealService} from '../../services/meal-service';

@Page({
    templateUrl: 'build/pages/meal-list/meal-list.html'
})
export class MealListPage {

    static get parameters() {
        return [[NavController], [NavParams], [MealService]];
    }

    constructor(nav, navParams, mealService) {
        this.nav = nav;
        this.mealService = mealService;
        this.selectedItem = navParams.get('item');
    }

    ngOnInit() {
        this.mealService.findAll().subscribe(
            data => this.meals = data
        );
    }

    itemTapped(event, meal) {
        this.nav.push(MealDetailsPage, {
            meal: meal
        });
    }
    
    doRefresh(refresher) {
        this.mealService.findAll().subscribe((data) => {
            this.meals = data;
            refresher.complete();
        });
    }

}