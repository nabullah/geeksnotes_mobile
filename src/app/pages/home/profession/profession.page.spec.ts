import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionPage } from './profession.page';

describe('ProfessionPage', () => {
  let component: ProfessionPage;
  let fixture: ComponentFixture<ProfessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
