import { Component } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {

  leagues: any[] = [];
  importantLeagues: string[] = [
    "Liga Profesional Argentina", "La Liga", "Premier League", "Serie A", "Bundesliga"
  ];

  constructor(private leagueService : LeaguesService) {}

  ngOnInit() {
    this.getImportantLeagues();
  }

  getImportantLeagues() {
    const countries = ['Argentina', 'Spain', 'England', 'Italy', 'Germany'];

    countries.forEach((country) => {
      this.leagueService.getLeaguesByCountry(country)
      .then((data) => {
        console.log(data);
        this.leagues = this.leagues.concat(data.response);
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }

  isImportantLeague(league : string) : boolean{
    return this.importantLeagues.some(leagueName => leagueName === league);
  }
}
