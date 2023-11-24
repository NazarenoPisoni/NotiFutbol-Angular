import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {

  team: any[] = [];
  teamId: any = 0;

  constructor(private route : ActivatedRoute,
              private teamService : TeamsService) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeamById(this.teamId)
    .then((data) => {
      this.team = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
    
  }            
}
