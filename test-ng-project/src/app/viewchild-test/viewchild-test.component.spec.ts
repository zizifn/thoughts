import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewchildTestComponent } from './viewchild-test.component';

describe('ViewchildTestComponent', () => {
  let component: ViewchildTestComponent;
  let fixture: ComponentFixture<ViewchildTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewchildTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchildTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
