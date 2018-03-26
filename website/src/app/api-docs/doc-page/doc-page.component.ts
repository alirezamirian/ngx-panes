import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss']
})
export class DocPageComponent implements OnInit {
  public docItem: any;

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.docItem) {
        this.docItem = data.docItem[0];
      }
    });
  }


}
