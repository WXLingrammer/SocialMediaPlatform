import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLinkComponent } from './display-link.component';

describe('DisplayLinkComponent', () => {
  let component: DisplayLinkComponent;
  let fixture: ComponentFixture<DisplayLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
