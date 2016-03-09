import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-framework/ionic';
import {CookDetailsPage} from '../cook-details/cook-details';
import {MealService} from '../../services/meal-service';

@Page({
    templateUrl: 'build/pages/meal-details/meal-details.html'
})
export class MealDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [MealService]];
    }

    constructor(nav, navParams, mealService) {
        this.nav = nav;
        this.mealService = mealService;
        this.meal = navParams.get('meal');
    }

    favorite(event, meal) {

        this.mealService.favorite(meal).subscribe(
            meal => {
                let alert = Alert.create({
                    title: 'Favorites',
                    subTitle: 'Meal added to your favorites',
                    buttons: ['OK']
                });
                this.nav.present(alert);
            }
        );

    }

    like(event, meal) {

        this.mealService.like(meal).subscribe(
            likes => {
                meal.likes = likes;
            }
        );

    }

    share(event, meal) {
        let actionSheet = ActionSheet.create({
            buttons: [
                {
                    text: 'Text',
                    handler: () => {
                        console.log('Text clicked');
                    }
                },
                {
                    text: 'Email',
                    handler: () => {
                        console.log('Email clicked');
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        console.log('Facebook clicked');
                    }
                },
                {
                    text: 'Twitter',
                    handler: () => {
                        console.log('Twitter clicked');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        this.nav.present(actionSheet);
    }

    showCook(event, cook) {
        this.nav.push(CookDetailsPage, {
            cook: cook
        });
    }
    
    showIngredients(event) {
        
    }

    showMap(event) {
        
    }
}