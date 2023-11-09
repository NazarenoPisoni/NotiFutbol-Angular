import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  news: any[] = [];

  constructor(private newsService : NewsService) {}

  ngOnInit() {
    this.getFootballNews();
  }

  getFootballNews() {
    this.newsService.getNews()
    .then((response) => {
      this.news = response.articles;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
