import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComp1Component } from './test-comp1.component';

describe('TestComp1Component', () => {
  let component: TestComp1Component;
  let fixture: ComponentFixture<TestComp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComp1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
