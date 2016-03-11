import {OnInit} from 'angular2/core';
import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {MealDetailsPage} from '../meal-details/meal-details';
import {MealService} from '../../services/meal-service';
 
@Page({
  templateUrl: 'build/pages/meal-map/meal-map.html',
})
export class MealMapPage {
  
  static get parameters() {
    return [[NavController], [NavParams], [MealService]];
  }
    
  constructor(nav, navParams, mealService) {
    this.nav = nav;
    this.mealService = mealService;
    this.selectedMeal = navParams.get('meal');
    this.map = null;
    this.searchQuery = '';
  }
  
  ngOnInit() {
    this.loadMap().then(() => {
        if (this.selectedMeal) {
            //Find the meal (in this case, it is already complete)
            this.setDirection(this.selectedMeal);
        } else {
            this.mealService.findAll().subscribe((data) => {
                this.meals = data;
                this.setMarkers();
            });   
        }
    });
  }
 
  loadMap(){
 
    return new Promise( (resolve, reject) => {
        let options = {timeout: 10000, enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.currentPosition = position;
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                let mapOptions = {
                    center: latLng,
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true
                }
                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                return resolve();
            },
            (error) => {
                console.log(error);
                return reject();
            }, options
        ); 
    });
    
  }
  
  setMarkers() {
      if (this.selectedMeal) {
          this.addMarker(selectedMeal);
      }
      this.meals.forEach((meal) => {
          this.addMarker(meal);
      });
  }
  
  addMarker(meal){
    if (!meal.coords) {
        return;
    }
    let latLng = new google.maps.LatLng(meal.coords.lat, meal.coords.long);
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: 'images/book-icon-map.png'
    });
    let content = `<p (click)="showMealDetails()">${meal.title}</p><img src="${meal.picture}" height="64" width="64">`;          
    this.addInfoWindow(marker, content, meal);
  }
  
  addInfoWindow(marker, content, meal){
 
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open(this.map, marker);
        this.tappedMeal = meal;
    });
  }
  
  setDirection(meal) {
    let directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map
    });
    
    let origin = new google.maps.LatLng(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
    let destination = new google.maps.LatLng(meal.coords.lat, meal.coords.long);
    
    // Set destination, origin and travel mode.
    let request = {
        destination: destination,
        origin: origin,
        travelMode: google.maps.TravelMode.WALKING
    };

    // Pass the directions request to the directions service.
    let directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
  }
  
  itemTapped(event, meal) {
    this.nav.push(MealDetailsPage, {
        meal: meal || this.tappedMeal
    }); 
  }
  
  getItems(searchBar) {
      
  }
}