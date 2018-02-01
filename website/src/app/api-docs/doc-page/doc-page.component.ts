import {AfterViewInit, Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss']
})
export class DocPageComponent implements OnInit, AfterViewInit {
  public docItem: any;

  constructor(private route: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.docItem) {
        this.docItem = data.docItem[0];
        setTimeout(() => this.syncFragmentScroll(this.route.snapshot.fragment));
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.syncFragmentScroll(fragment);
    });
  }

  @HostListener('click', ['$event'])
  handleLinkClicks(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      // note that event.target.href is a property which is different with href attribute. href prop is always absolute
      let href = event.target.getAttribute('href');
      if (href.indexOf('http') !== 0) {
        event.preventDefault();
        this.router.navigateByUrl(href);
      }
    }
  }

  private syncFragmentScroll(fragment: string) {
    if (isPlatformBrowser(this.platformId)) {
      const elem = document.querySelector('#' + fragment);
      if (elem) {
        this.router.events.pipe(first()).subscribe(event => {
          setTimeout(() => {
            elem.scrollIntoView();
          });
        });
        setTimeout(() => {
          elem.scrollIntoView();
        });
      }
    }
  }
}
