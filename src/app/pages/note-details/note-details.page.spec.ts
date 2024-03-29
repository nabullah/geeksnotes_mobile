import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteDetailsPage } from './note-details.page';

describe('NoteDetailsPage', () => {
  let component: NoteDetailsPage;
  let fixture: ComponentFixture<NoteDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
