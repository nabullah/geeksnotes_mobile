import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesListingPage } from './notes-listing.page';

describe('NotesListingPage', () => {
  let component: NotesListingPage;
  let fixture: ComponentFixture<NotesListingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotesListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
