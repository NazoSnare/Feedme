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
    this.selectedItem = navParams.get('item');
    this.map = null;
    this.loadMap();
  }
  
  ngOnInit() {
    this.mealService.findAll().subscribe((data) => {
        this.meals = data;
        this.setMarkers();
    });
  }
  
  setMarkers() {
      this.meals.forEach((meal) => {
          this.addMarker(meal);
      });
  }
 
  loadMap(){
 
    let options = {timeout: 10000, enableHighAccuracy: true};
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
          let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
 
          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      },
      (error) => {
          console.log(error);
      }, options
    ); 
  }
  
  addMarker(meal){
    if (!meal.coords) {
        return;
    }
    let latLng = new google.maps.LatLng(meal.coords.lat, meal.coords.long);
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
    });
    let content = `<h4>${meal.title}</h4>`;          
    this.addInfoWindow(marker, content);
  }
  
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open(this.map, marker);
    });
  }
}