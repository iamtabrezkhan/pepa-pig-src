import { Component, OnInit, EventEmitter, Output, AfterContentChecked } from '@angular/core';
import { Animations } from '../../shared/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    Animations.unfoldDown,
    Animations.slide
  ]
})
export class NavbarComponent implements OnInit, AfterContentChecked {

  searchSubject = new Subject;
  @Output() onSearchLocation = new EventEmitter();

  location;
  isResultContainerOpen = false;
  locationsObj;
  locationSuggestions;
  isSearching = false;

  constructor(
    private locationService: LocationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      v => {
        if(v) {
          // make request to get locations
          this.isSearching = true;
          this.locationsObj = {};
          this.locationService.getLocations(v).subscribe(
            data => {
              if(data['status'] === 'success') {
                this.isSearching = false;
                this.locationsObj = data;
              } else {
              }
            }
          )
        }
      }
    )
  }

  ngAfterContentChecked() {
    this.location = this.userService.getCurrentLocation() || {};
  }

  onFocus(e) {
    this.isResultContainerOpen = true;
  }

  onBlur(e) {
    let that = this;
    setTimeout(function() {
      that.isResultContainerOpen = false;
    }, 100)
  }

  onLocationSelect(loc) {
    this.location = loc;
    this.locationsObj = {};
    this.onSearchLocation.emit(loc);
  }

  onKeyUp(e) {
    this.searchSubject.next(e.target.value);
  }

  detectLocation() {
    this.userService.detectLocation((position) => {
      this.userService.onLocationDetect({
        success: true,
        position
      })
    }, (error) => {
      this.userService.onLocationDetect({
        success: false,
        error
      })
    })
  }

}
