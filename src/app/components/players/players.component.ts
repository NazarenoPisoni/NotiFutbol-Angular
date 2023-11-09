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
  errorMessage = '';

  constructor(private playerService : PlayersService,
              private router : Router) {}

  searchPlayers() {
    this.playerService.searchPlayersByName(this.searchQuery)
      .subscribe((results: any[]) => {
        this.players = results;
        this.errorMessage = '';
      },
      (error : string) => {
        this.players = [];
        this.errorMessage = 'Error al buscar jugadores';
      });
  }
}
