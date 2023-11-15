import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent {

  match: any[] = [];
  matchId: any = 0;

  constructor(private route : ActivatedRoute,
              private matchService : MatchesService) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('id');
    this.matchService.getMatchById(this.matchId)
    .then((data) => {
      this.match = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
  }            
}
