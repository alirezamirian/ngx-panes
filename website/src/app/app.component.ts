import {Component, DoCheck, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {filter, first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnInit {

  constructor(private route: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId) {

  }

  ngDoCheck(): void {
    console.log('cheeeeeeck');
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => this.syncFragmentScroll(this.route.snapshot.fragment));
    });
  }

  private syncFragmentScroll(fragment: string) {
    if (isPlatformBrowser(this.platformId) && fragment) {
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
