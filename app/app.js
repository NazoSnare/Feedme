import {App, IonicApp, Platform} from 'ionic-framework/ionic';
//import {Storage, LocalStorage} from 'ionic-framework';
import {WelcomePage} from './pages/welcome/welcome';
import {MealMapPage} from './pages/meal-map/meal-map';
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
            {title: 'Map', component: MealMapPage, icon: "pin"},
            {title: 'Books', component: MealListPage, icon: "book"},
            {title: 'Favorites', component: FavoriteListPage, icon: "star"}
        ];
        
        //TODO
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
