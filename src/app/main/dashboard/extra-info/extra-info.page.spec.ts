import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraInfoPage } from './extra-info.page';

describe('ExtraInfoPage', () => {
  let component: ExtraInfoPage;
  let fixture: ComponentFixture<ExtraInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
