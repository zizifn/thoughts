import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpCallComponent } from './http-call.component';

describe('HttpCallComponent', () => {
  let component: HttpCallComponent;
  let fixture: ComponentFixture<HttpCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
