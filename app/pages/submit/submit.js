import {Page, NavController} from 'ionic-framework/ionic';
import {MealService} from '../../services/meal-service';
import {GooglebooksService} from '../../services/googlebooks-service';
import {BarcodeScanner} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/submit/submit.html'
})
export class SubmitPage {

    static get parameters() {
        return [[NavController], [MealService], [GooglebooksService]];
    }

    constructor(nav, mealService, googlebooksService) {
        this.nav = nav;
        this.mealService = mealService;
        this.googlebooksService = googlebooksService;
        this.book = {};
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
    
    getBookInfo() {
        //TODO Activate loading animation
        this.googlebooksService.getBookInfoFromISBN(this.book.isbn).subscribe(
            data => {
                if (data) {
                    this.book = {
                        isbn: this.book.isbn,
                        title: data.volumeInfo.title,
                        authors: data.volumeInfo.authors,
                        publisher: data.volumeInfo.publisher,
                        publishedDate: data.volumeInfo.publishedDate,
                        description: data.volumeInfo.description,
                        categories: data.volumeInfo.categories,
                        pageCount: data.volumeInfo.pageCount,
                        smallDescription: data.searchInfo.textSnippet,
                        averageRating: data.volumeInfo.averageRating,
                        language: data.volumeInfo.language,
                        thumbnail: data.volumeInfo.imageLinks.thumbnail,
                        country: data.saleInfo.country
                    }
                }
                else {
                    this.error = 'Book not found';
                    console.log('BOOK NOT FOUND');
                    setTimeout(() => {this.error = null}, 3000);
                }
                //TODO Remove loading animation
            }
        );
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
    
    submit() {
        mealService.submitBook(this.book).subscribe(
            data => this.nav.pop()
        ).catch(
            err => console.log('ERROR WHEN SUBMITING ITEM', err)//TODO handle error creation
        );
    }

    
}