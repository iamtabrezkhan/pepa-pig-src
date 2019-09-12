import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import { UserService } from './services/user.service';
import { Animations } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animations.notification
  ]
})
export class AppComponent implements OnInit {

  title = 'anaira-food';
  locationObj;
  prevLocationObj;
  notification;
  currentRestaurant;

  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getEvent().subscribe(
      res => {
        if(res['event'] === 'show notification') {
          if(!this.notification) {
            this.notification = res['data'];
            let that = this;
            setTimeout(function() {
              that.notification = null;
            }, 2000);
          }
        }
      }
    )
  }

  onSearchLocation(locationObj) {
    this.prevLocationObj = this.locationObj;
    this.locationObj = locationObj;
    if(this.prevLocationObj) {
      if(this.prevLocationObj.entity_id !== this.locationObj.entity_id) {
        this.userService.canSearch({
          can: true,
          locationObj
        });
        this.userService.saveCurrentLocation(locationObj);
      }
    } else {
      this.userService.canSearch({
        can: true,
        locationObj
      });
      this.userService.saveCurrentLocation(locationObj);
    }
  }

  selectRestaurant(res) {
    this.currentRestaurant = res;
  }

  deselectRestaurant(v) {
    this.currentRestaurant = v;
  }

}