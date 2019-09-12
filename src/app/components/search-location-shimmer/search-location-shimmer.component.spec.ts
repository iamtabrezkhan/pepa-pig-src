import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationShimmerComponent } from './search-location-shimmer.component';

describe('SearchLocationShimmerComponent', () => {
  let component: SearchLocationShimmerComponent;
  let fixture: ComponentFixture<SearchLocationShimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLocationShimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocationShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
