import {App, IonicApp, Platform} from 'ionic-framework/ionic';
//import {Storage, LocalStorage} from 'ionic-framework';
import {WelcomePage} from './pages/welcome/welcome';
import {MealListPage} from './pages/meal-list/meal-list';
import {CookListPage} from './pages/cook-list/cook-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {MealService} from './services/meal-service';
import {CookService} from './services/cook-service';

@App({
    templateUrl: 'build/app.html',
    config: {},
    providers: [MealService, CookService]
})
class MyApp {

    static get parameters() {
        return [[IonicApp], [Platform]];
    }

    constructor(app, platform) {

        // set up our app
        this.app = app;
        this.platform = platform;
        this.initializeApp();

        // set our app's pages
        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            {title: 'Meals', component: MealListPage, icon: "home"},
            {title: 'Cooks', component: CookListPage, icon: "people"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"}
        ];
        
        /*
        this.local = new Storage(LocalStorage);
        if (!this.local.get('firstLaunch')) {
            this.rootPage = WelcomePage;
        } else {
            this.local.set('firstLaunch', false);
            this.rootPage = MealListPage;
        }
        */
        
        this.rootPage = WelcomePage;
        
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (window.StatusBar) {
                window.StatusBar.styleDefault();
            }
        });
    }

    openPage(page) {
        // navigate to the new page if it is not the current page
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }

}
