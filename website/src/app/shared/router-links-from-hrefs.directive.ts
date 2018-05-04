import {Directive, HostListener} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[appRouterLinksFromHrefs]'
})
export class RouterLinksFromHrefsDirective {

  constructor(private router: Router) {
  }

  @HostListener('click', ['$event'])
  handleLinkClicks(event: any) {
    if (event.target.tagName.toLowerCase() === 'a' && !event.target.getAttribute('ng-reflect-router-link')) {
      // note that event.target.href is a property which is different with href attribute. href prop is always absolute
      const href = event.target.getAttribute('href');
      if (href.indexOf('http') !== 0) {
        event.preventDefault();
        this.router.navigateByUrl(href[0] === '#' ? href.substring(1) : href);
      }
    }
  }
}
