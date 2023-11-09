import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesByCountryComponent } from './leagues-by-country.component';

describe('LeaguesByCountryComponent', () => {
  let component: LeaguesByCountryComponent;
  let fixture: ComponentFixture<LeaguesByCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesByCountryComponent]
    });
    fixture = TestBed.createComponent(LeaguesByCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
