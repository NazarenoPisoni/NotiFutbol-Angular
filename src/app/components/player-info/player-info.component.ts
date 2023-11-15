import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent {

  player: any[] = [];
  playerName: any = '';
  news: any[] = [];

  constructor(private route : ActivatedRoute,
              private newsService : NewsService,
              private playerService : PlayersService) {}

  ngOnInit() {
    this.playerName = this.route.snapshot.paramMap.get('id');
    this.playerService.searchPlayersByName(this.playerName)
      .subscribe((data) => {
        this.player = data;
        console.log(data);
      },
      (error : string) => {
        console.log(error);
      });

    this.newsService.getNewsByName(this.playerName)
    .then((data) => {
      this.news = data.articles;
    })
    .catch((error) => {
      console.log(error);
    })
  }            
}
