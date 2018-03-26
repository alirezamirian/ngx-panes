import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss']
})
export class DocPageComponent implements OnInit {
  public docItem: any;

  constructor(private route: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.docItem) {
        this.docItem = data.docItem[0];
      }
    });
  }

  @HostListener('click', ['$event'])
  handleLinkClicks(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      // note that event.target.href is a property which is different with href attribute. href prop is always absolute
      const href = event.target.getAttribute('href');
      if (href.indexOf('http') !== 0) {
        event.preventDefault();
        this.router.navigateByUrl(href);
      }
    }
  }
}
