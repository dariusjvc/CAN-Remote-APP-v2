import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputsPage } from './outputs.page';

describe('OutputsPage', () => {
  let component: OutputsPage;
  let fixture: ComponentFixture<OutputsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
