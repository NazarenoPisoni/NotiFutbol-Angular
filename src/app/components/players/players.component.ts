import { Component } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {

  searchQuery = '';
  players: any[] = [];

  constructor(private playerService : PlayersService) {}

  searchPlayers() {
    this.playerService.searchPlayersByName(this.searchQuery)
      .subscribe((results: any[]) => {
        this.players = results;
      },
      (error) => {
        this.players = [];
        console.log(error);
      });
  }
}
