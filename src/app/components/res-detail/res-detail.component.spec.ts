import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResDetailComponent } from './res-detail.component';

describe('ResDetailComponent', () => {
  let component: ResDetailComponent;
  let fixture: ComponentFixture<ResDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
