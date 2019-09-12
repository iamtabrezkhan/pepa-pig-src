import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locationUrl = 'https://developers.zomato.com/api/v2.1/locations';
  geocodeUrl = 'https://developers.zomato.com/api/v2.1/geocode';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getLocations(query) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'user-key': this.userService.getApiKey()
    })
    let url = `${this.locationUrl}?query=${query}&count=10`;
    return this.http.get(url, {headers: headers});
  }

  getGeoCodeLocation(lat, long) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'user-key': this.userService.getApiKey()
    })
    let url = `${this.geocodeUrl}?lat=${lat}&lon=${long}`;
    return this.http.get(url, {headers: headers});
  }

}
