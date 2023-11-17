import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {

  matches: any[] = [];
  headerText = '';
  groupedMatches: { [key: string]: any[] } = {};
  leagueNames: {name: string, logo: string}[] = [];
  importantLeagues: { name: string, country: string }[] = [
    { name: "Premier League", country: "England" },
    { name: "Premier League 2 Division One", country: "England" },
    { name: "League One", country: "England" },
    { name: "La Liga", country: "Spain" },
    { name: "Bundesliga", country: "Germany" },
    { name: "Serie A", country: "Italy" },
    { name: "Copa de la Liga Profesional", country: "Argentina" },
    { name: "Primera Nacional", country: "Argentina" },
    { name: "Primera B Metropolitana", country: "Argentina" },
    { name: "Primera C", country: "Argentina" },
    { name: "Primera D", country: "Argentina" },
    { name: "Serie A", country: "Brazil" },
    { name: "Ligue 1", country: "France" },
    { name: "Ligue 2", country: "France" },
  ];
  

  constructor(private matchService : MatchesService,
              private router : Router) {}

  getMatchesByDate(date : string) {
    this.matchService.getMatchesByDate(date)
    .then((data) => {
      this.matches = data.response;
      this.groupMatchesByLeague();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMatchesToday() {
    const today = this.getCurrentDate();
    this.getMatchesByDate(today);

    this.headerText = "Partidos de hoy";
  }

  getMatchesYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.getMatchesByDate(this.formatDate(yesterday));

    this.headerText = "Partidos de ayer";
  }

  getMatchesTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.getMatchesByDate(this.formatDate(tomorrow));

    this.headerText = "Partidos de mañana";
  }

  formatDate(date : Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  groupMatchesByLeague() {
    this.groupedMatches = {};
    this.leagueNames = [];

    for(const match of this.matches) {
      const leagueName = {
        name: match.league.name,
        logo: match.league.logo 
      };
      const country = match.league.country;

      if(this.isLeagueImportant(leagueName.name, country)) {
        if(!this.groupedMatches[leagueName.name]) {
          this.groupedMatches[leagueName.name] = [];
          this.leagueNames.push(leagueName);
        }
        this.groupedMatches[leagueName.name].push(match);
      }
      
    }
  }

  isLeagueImportant(leagueName: string, country: string): boolean {
    return this.importantLeagues.some(league => league.name === leagueName
      && league.country === country);
  }

}
