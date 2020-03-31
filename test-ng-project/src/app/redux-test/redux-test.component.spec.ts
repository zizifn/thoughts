import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduxTestComponent } from './redux-test.component';

describe('ReduxTestComponent', () => {
  let component: ReduxTestComponent;
  let fixture: ComponentFixture<ReduxTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReduxTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReduxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
