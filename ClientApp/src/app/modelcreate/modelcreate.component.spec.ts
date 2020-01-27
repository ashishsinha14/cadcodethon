import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcreateComponent } from './modelcreate.component';

describe('ModelcreateComponent', () => {
  let component: ModelcreateComponent;
  let fixture: ComponentFixture<ModelcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
