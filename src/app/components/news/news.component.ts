import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  mainNews: any;
  otherNews: any[] = [];

  constructor(private newsService : NewsService) {}

  ngOnInit() {
    this.getFootballNews();
  }

  getFootballNews() {
    this.newsService.getNews()
    .then((response) => {
      const articles = response.articles.reverse();
      this.mainNews = articles[0];
      this.otherNews = articles.slice(1);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
