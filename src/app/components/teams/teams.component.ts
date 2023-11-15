import { Component } from '@angular/core';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: any[] = [];
  importantTeamNames: string[] = [
    "River Plate", "Boca Juniors", "Racing Club", "San Lorenzo", "Independiente", 
    "Real Madrid", "Barcelona", "Manchester City", "Liverpool", "Chelsea"
  ];

  constructor(private teamService : TeamsService) {}

  ngOnInit() {
    this.getImportantTeams();
  }

  getImportantTeams() {
    const countries = ['Argentina', 'Brazil', 'England', 'Spain'];

    countries.forEach((country) => {
      this.teamService.getTeamsByCountry(country)
      .then((data) => {
        this.teams = this.teams.concat(data.response);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }

  isImportantTeam(team : string) : boolean{
    return this.importantTeamNames.some(teamName => teamName === team);
  }

}
