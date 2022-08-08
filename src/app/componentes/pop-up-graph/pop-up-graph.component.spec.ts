import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGraphComponent } from './pop-up-graph.component';

describe('PopUpGraphComponent', () => {
  let component: PopUpGraphComponent;
  let fixture: ComponentFixture<PopUpGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
