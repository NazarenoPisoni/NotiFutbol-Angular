import { Component } from '@angular/core';
import { user } from 'src/app/models/user.model';
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
              private newsService : NewsService) {}

  team: any[] = [];
  teamName: string = '';
  mainNews: any;
  otherNews: any[] = [];            

  async ngOnInit() {
    await this.getTeam();
    this.getNewsByTeam();
  } 
  
  get getUser(): user | undefined {
    return this.userService.currentUser;
  }

  async getTeam() {
    try {
      const data = await this.teamService.getTeamById(this.getUser?.favoriteTeamId);
      this.team = data.response;
      this.teamName = data.response[0].team.name;
    } catch (error) {
      console.log(error);
    }
  }

  getNewsByTeam() {
    this.newsService.getNewsByName(this.teamName)
    .then((data) => {
      const articles = data.articles;
      this.mainNews = articles[0];
      this.otherNews = articles.slice(1);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
