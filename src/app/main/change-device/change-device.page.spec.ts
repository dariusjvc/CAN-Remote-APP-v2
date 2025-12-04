import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDevicePage } from './change-device.page';

describe('ChangeDevicePage', () => {
  let component: ChangeDevicePage;
  let fixture: ComponentFixture<ChangeDevicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
