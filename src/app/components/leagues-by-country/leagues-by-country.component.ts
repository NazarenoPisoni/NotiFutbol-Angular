import { Component } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';

@Component({
  selector: 'app-leagues-by-country',
  templateUrl: './leagues-by-country.component.html',
  styleUrls: ['./leagues-by-country.component.css']
})
export class LeaguesByCountryComponent {

  leagues: any[] = [];
  selectedCountry = '';

  constructor(private leagueService : LeaguesService) {}

  ngOnInit() {
    this.leagueService.getAllLeaguesByCountry()
    .then((data: any) => {
      this.leagues = data.response;
    })
  }
}
