import {Page, NavController} from 'ionic-framework/ionic';
import {MealService} from '../../services/meal-service';

@Page({
    templateUrl: 'build/pages/submit/submit.html'
})
export class SubmitPage {

    static get parameters() {
        return [[NavController], [MealService]];
    }

    constructor(nav, mealService) {
        this.nav = nav;
        this.mealService = mealService;
        this.book = null;
    }
    
    scanBarcode() {
        BarcodeScanner.scan().then((barcodeData) => {
            console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        }, (err) => {
            console.log('ERROR WHEN SCANING BARCODE', err);
        });
    }
    
    getBookInfo(isbn) {
        //TODO Activate loading animation
        mealService.getBookInfo().subscribe(
            data => {
                this.book = data
                //TODO Remove loading animation
            }
        ).catch(
            err => {
                console.log('ERROR WHEN GETTING BOOK INFO', err);
                //TODO Remove loading animation
            }
        );
        
        //google books api
        //https://www.googleapis.com/books/v1/volumes?q=isbn:9781443411080
        //book = data.items[0]
        //title = book.volumeInfo.title
        //authors = book.volumeInfo.authors
        //publisher = book.publisher
        //publishedDate = book.publishedDate
        //description = book.description
        //smallDescription = book.searchInfo.textSnippet
        //categories = book.categories
        //pageCount = book.pageCount
        //averageRating = book.averageRating
        //language = book.language
        //thumnail = book.imageLinks.thumnail
    }
    
    autoSetBookCoords() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.book.coords = [position.coords.latitude, position.coords.longitude];
            }
        );
    }
    
    setBookCoords() {
        
    }
    
    submitBook() {
        mealService.submitBook(this.book).subscribe(
            data => this.nav.pop()
        ).catch(
            err => console.log('ERROR WHEN SUBMITING ITEM', err)//TODO handle error creation
        );
    }

    
}