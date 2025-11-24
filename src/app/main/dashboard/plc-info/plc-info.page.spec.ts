import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlcInfoPage } from './plc-info.page';

describe('PlcInfoPage', () => {
  let component: PlcInfoPage;
  let fixture: ComponentFixture<PlcInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
