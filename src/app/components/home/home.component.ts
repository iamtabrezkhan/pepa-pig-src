import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Animations } from '../../shared/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    Animations.rotateRightFade,
    Animations.slide
  ]
})
export class HomeComponent implements OnInit {

  @Output() onRestaurantSelect = new EventEmitter();

  resString = '';
  isSearchOpen = false;
  isSearching = false;
  $resSearch = new Subject;
  currentLocation;
  lat;
  long;
  overlayMessage = 'Please search for a location or allow automatic location detection in site settings';
  restaurants;
  searchResults;
  isLoading = false;
  start = 0;
  count = 20;
  isLoadingMore = false;

  constructor(
    private userService: UserService,
    private restaurantService: RestaurantService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.userService.listenDetectLocation().subscribe(
      res => {
        if(res['success']) {
          this.overlayMessage = 'Location detected, please wait...';
          this.updateRestaurantsByLocation(res['position'].coords.latitude, res['position'].coords.longitude);
        } else {
          if(res['error'].code === 1) {
            // user denied geolocation
            // this.overlayMessage = res['error'].message;
            this.userService.setEvent('show notification', res['error'].message);
          } else {
            // geolocation not supported
            // this.overlayMessage = res['error'].message;
            this.userService.setEvent('show notification', res['error'].message);
          }
        }
      }
    )
    this.currentLocation = this.userService.getCurrentLocation();
    if(this.currentLocation) {
      // make request to search for restaurants based on location
      this.isLoading = true;
      this.restaurantService.getRestaurants(
        this.currentLocation['entity_id'],
        this.currentLocation['entity_type'],
        this.start,
        this.count
      ).subscribe(
        data => {
          this.isLoading = false;
          this.restaurants = data;
        }
      )
    } else {
      this.userService.detectLocation((position) => {
        this.overlayMessage = 'Location detected, please wait...';
        this.updateRestaurantsByLocation(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        if(error.code === 1) {
          // user denied geolocation
          this.overlayMessage = error.message;
        } else {
          // geolocation not supported
          this.overlayMessage = error.message;
        }
      })
    }
    this.$resSearch.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      v => {
        if(v) {
          // make request to search for restaurants based on search string
          this.isLoading = true;
          this.isSearching = true;
          this.restaurantService.searchRestaurants(
            v,
            this.currentLocation['entity_id'],
            this.currentLocation['entity_type'],
            0,
            20
          ).subscribe(
            data => {
              this.isLoading = false;
              this.searchResults = data;
            }
          )
        }
      }
    )
    this.userService.doSearch().subscribe(
      res => {
        if(res['can'] === true) {
          // search for restaurant based on location
          this.isLoading = true;
          this.currentLocation = res['locationObj'];
          this.restaurantService.getRestaurants(
            this.currentLocation['entity_id'],
            this.currentLocation['entity_type'],
            this.start,
            this.count
          ).subscribe(
            data => {
              this.isLoading = false;
              this.restaurants = data;
            }
          )
        }
      }
    )
  }

  onBlur(e) {
    // this.isSearchOpen = false;
  }

  onFocus(e) {
    this.isSearchOpen = true;
  }

  onKeyUp(e) {
    this.$resSearch.next(this.resString);
  }

  closeSearch() {
    this.searchResults = {};
    this.isSearchOpen = false;
    this.resString = '';
  }

  updateRestaurantsByLocation(lat, long) {
    this.lat = lat;
    this.long = long;
    this.locationService.getGeoCodeLocation(this.lat, this.long).subscribe(
      data => {
        this.currentLocation = data['location'];
        this.userService.saveCurrentLocation(this.currentLocation);
        this.isLoading = true;
        this.restaurantService.getRestaurants(
          this.currentLocation['entity_id'],
          this.currentLocation['entity_type'],
          0,
          20
        ).subscribe(
          data => {
            this.isLoading = false;
            this.restaurants = data;
          }
        )
      }
    )
  }

  selectRestaurant(res) {
    this.onRestaurantSelect.emit(res);
    window.scrollTo(0, 0);
  }

  onLoadMore() {
    if(!this.isLoadingMore) {
      this.start++;
      this.isLoadingMore = true;
      this.restaurantService.getRestaurants(
        this.currentLocation['entity_id'],
        this.currentLocation['entity_type'],
        this.start*this.count,
        this.count
      ).subscribe(
        data => {
          this.isLoadingMore = false;
          this.restaurants['restaurants'] = this.restaurants['restaurants'].concat(data['restaurants']);
        }
      )
    }
  }

}
