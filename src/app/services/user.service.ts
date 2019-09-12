import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiKey = '8a3b7ae2a684a388b828d197005068eb';
  $canSearchSubject = new Subject;
  $detectLocationSubject = new Subject;
  $eventSubject = new Subject;

  constructor() { }

  getApiKey() {
    return this.apiKey;
  }

  canSearch(obj) {
    this.$canSearchSubject.next(obj);
  }

  doSearch() {
    return this.$canSearchSubject.asObservable();
  }

  saveCurrentLocation(loc) {
    localStorage.setItem('currentLocation', JSON.stringify(loc));
  }

  getCurrentLocation() {
    return JSON.parse(localStorage.getItem('currentLocation'));
  }

  detectLocation(successCallback, errorCallback) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        successCallback(position);
      }, (error) => {
        if(error.code == 1) {
          errorCallback(error);
        } else {
          
        }
      })
    } else {
      errorCallback({
        code: 2,
        message: 'Geolocation not supported by browser'
      });
    }
  }

  onLocationDetect(obj) {
    this.$detectLocationSubject.next(obj);
  }

  listenDetectLocation() {
    return this.$detectLocationSubject.asObservable();
  }

  setEvent(eventName, value) {
    this.$eventSubject.next({
      event: eventName,
      data: value
    })
  }

  getEvent() {
    return this.$eventSubject.asObservable();
  }

}
