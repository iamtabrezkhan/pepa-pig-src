import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  searchUrl = 'https://developers.zomato.com/api/v2.1/search';
  dailyMenuUrl = 'https://developers.zomato.com/api/v2.1/dailymenu';

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getRestaurants(entityId, entityType, start, count) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'user-key': this.userService.getApiKey()
    })
    let url = `${this.searchUrl}?entity_id=${entityId}&entity_type=${entityType}&count=${count}&sort=rating&start=${start}`;
    return this.http.get(url, {headers: headers});
  }

  searchRestaurants(query, entityId, entityType, start, count) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'user-key': this.userService.getApiKey()
    })
    let url = `${this.searchUrl}?q=${query}&entity_id=${entityId}&entity_type=${entityType}&count=${count}&start=${start}`;
    return this.http.get(url, {headers: headers});
  }

  getDailyMenu(resId) {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'user-key': this.userService.getApiKey()
    })
    let url = `${this.dailyMenuUrl}?res_id=${resId}`;
    return this.http.get(url, {headers: headers});
  }

}
