import { Component } from '@angular/core';
import { LeaguesService } from 'src/app/services/leagues.service';
import { NewsService } from 'src/app/services/news.service';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery = '';
  teams: any[] = [];
  leagues: any[] = [];
  players: any[] = [];
  news: any[] = [];

  constructor(private teamService : TeamsService,
              private leagueService : LeaguesService,
              private playerService : PlayersService,
              private newsService : NewsService) {}

  searchTeamsByName() {
    this.teamService.getTeamsByName(this.searchQuery)
    .then((data) => {
      this.teams = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  searchLeaguesByName() {
    this.leagueService.getLeaguesByName(this.searchQuery)
    .then((data) => {
      this.leagues = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  searchPlayers() {
    this.playerService.searchPlayersByName(this.searchQuery)
      .subscribe((results: any[]) => {
        this.players = results;
      },
      (error : string) => {
        console.log(error);
      });
  }

  searchNewsByName() {
    this.newsService.getNewsByName(this.searchQuery)
    .then((data) => {
      this.news = data.articles.reverse();
      console.log(data.articles);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  searchAllByName() {
    this.searchTeamsByName();
    this.searchLeaguesByName();
    this.searchPlayers();
    this.searchNewsByName();
  }
}
