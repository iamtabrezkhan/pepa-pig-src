import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-res-detail',
  templateUrl: './res-detail.component.html',
  styleUrls: ['./res-detail.component.scss']
})
export class ResDetailComponent implements OnInit {

  @Input() currentRestaurant;
  @Output() onDeselectRestaurant = new EventEmitter();
  dailyMenus;
  menuError;
  isLoadingMenu = false;

  constructor(
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    console.log(this.currentRestaurant)
    this.isLoadingMenu = true;
    this.restaurantService.getDailyMenu(this.currentRestaurant.R.res_id).subscribe(
      data => {
        if(data['status'] === 'success') {
          this.isLoadingMenu = false;
          this.dailyMenus = data['daily_menus'];
        }
      },
      err => {
        if(err.error.code === 400) {
          this.isLoadingMenu = false;
          this.menuError = err.error.message;
        }
      }
    )
  }

  goBack() {
    this.onDeselectRestaurant.emit(null);
  }

  parseInt(v) {
    return Number.parseFloat(v);
  }

}
