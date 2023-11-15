import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInfoComponent } from './league-info.component';

describe('LeagueInfoComponent', () => {
  let component: LeagueInfoComponent;
  let fixture: ComponentFixture<LeagueInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueInfoComponent]
    });
    fixture = TestBed.createComponent(LeagueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
