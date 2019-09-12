import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResCardShimmerComponent } from './components/res-card-shimmer/res-card-shimmer.component';
import { SearchLocationShimmerComponent } from './components/search-location-shimmer/search-location-shimmer.component';
import { HomeComponent } from './components/home/home.component';
import { ResDetailComponent } from './components/res-detail/res-detail.component';
import { ResCardComponent } from './components/res-card/res-card.component';
import { ResCuisinesPipe } from './shared/pipes/res-cuisines.pipe';
import { RippleDirective } from './directive/ripple.directive';
import { BarRatingModule } from "ngx-bar-rating";
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResCardShimmerComponent,
    SearchLocationShimmerComponent,
    HomeComponent,
    ResDetailComponent,
    ResCardComponent,
    ResCuisinesPipe,
    RippleDirective,
    DishCardComponent,
    ReviewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1JdqVqknZXpBj7xdMck9r2pz1vC8Gojg'
    }),
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
