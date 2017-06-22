import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanesComponent} from './panes.component';

describe('PanesComponent', () => {
  let component: PanesComponent;
  let fixture: ComponentFixture<PanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
