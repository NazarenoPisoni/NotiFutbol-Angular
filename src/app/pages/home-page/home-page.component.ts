import { Component } from '@angular/core';
import { HighlightsService } from 'src/app/services/highlights.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  highlights:  any[] = []

  constructor(private highlightService : HighlightsService) {}

  ngOnInit() {
    this.highlightService.getHighlights()
    .then((data) => {
      this.highlights = data.response;
      console.log(data.response);
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
