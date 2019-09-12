import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResCardShimmerComponent } from './res-card-shimmer.component';

describe('ResCardShimmerComponent', () => {
  let component: ResCardShimmerComponent;
  let fixture: ComponentFixture<ResCardShimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResCardShimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResCardShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
