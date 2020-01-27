import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskprofileComponent } from './riskprofile.component';

describe('RiskprofileComponent', () => {
  let component: RiskprofileComponent;
  let fixture: ComponentFixture<RiskprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
