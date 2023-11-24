import { Component } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { MatchesService } from 'src/app/services/matches.service';
import { NewsService } from 'src/app/services/news.service';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent {

  constructor(private userService : UserService,
              private teamService : TeamsService,
              private newsService : NewsService,
              private matchService : MatchesService) {}

  team: any[] = [];
  teamName: string = '';
  latestMatches: any[] = [];
  mainNews: any;
  otherNews: any[] = [];
  playerNews: any[] = [];           

  async ngOnInit() {
    await this.getTeam();
    this.getNewsByTeam();
    await this.getLatestMatches();
    await this.getNewsByPlayer();
  } 
  
  get getUser(): user | undefined {
    return this.userService.currentUser;
  }

  async getTeam() {
    try {
      const data = await this.teamService.getTeamById(this.getUser?.favoriteTeams[0]);
      this.team = data.response;
      this.teamName = data.response[0].team.name;
    } catch (error) {
      console.log(error);
    }
  }

  getNewsByTeam() {
    this.newsService.getNewsByName(this.teamName)
    .then((data) => {
      const articles = data.articles.reverse();
      this.mainNews = articles[0];
      this.otherNews = articles.slice(1);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async getLatestMatches() {
    for (const teamId of this.getUser?.favoriteTeams || []) {
      try {
        const data = await this.matchService.getMatchByTeamId(teamId);
        const teamMatches = data.response.reverse().slice(0, 3);
        this.latestMatches = this.latestMatches.concat(teamMatches.reverse());
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getNewsByPlayer() {
    for (const player of this.getUser?.favoritePlayers || []) {
      try {
        const data = await this.newsService.getNewsByName(player);
        const playerNews = data.articles.reverse().slice(0, 4);
        this.playerNews = this.playerNews.concat(playerNews);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
