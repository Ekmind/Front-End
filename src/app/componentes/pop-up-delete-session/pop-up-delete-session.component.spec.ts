import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteSessionComponent } from './pop-up-delete-session.component';

describe('PopUpDeleteSessionComponent', () => {
  let component: PopUpDeleteSessionComponent;
  let fixture: ComponentFixture<PopUpDeleteSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpDeleteSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
