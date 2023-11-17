import { Component } from '@angular/core';
import { HighlightsService } from 'src/app/services/highlights.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css']
})
export class HighlightsComponent {

  highlights:  any[] = [];

  constructor(private highlightService : HighlightsService) {}

  ngOnInit() {
    this.highlightService.getHighlights()
    .then((data) => {
      this.highlights = data.response;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
