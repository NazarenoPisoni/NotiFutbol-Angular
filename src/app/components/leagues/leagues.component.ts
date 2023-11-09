import { Component } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  leagues : any[] = [];

  constructor(private leagueService : LeaguesService) {}

  ngOnInit() {
    
  }
}
