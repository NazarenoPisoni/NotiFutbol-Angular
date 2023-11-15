import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.css']
})
export class LeagueInfoComponent {

  league: any[] = [];
  leagueId: any = 0;

  constructor(private route : ActivatedRoute,
              private leagueService : LeaguesService) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('id');
    this.leagueService.getLeagueById(this.leagueId)
    .then((data) => {
      this.league = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
  }              
}
