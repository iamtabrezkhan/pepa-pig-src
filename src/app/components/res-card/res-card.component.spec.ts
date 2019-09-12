import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResCardComponent } from './res-card.component';

describe('ResCardComponent', () => {
  let component: ResCardComponent;
  let fixture: ComponentFixture<ResCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
