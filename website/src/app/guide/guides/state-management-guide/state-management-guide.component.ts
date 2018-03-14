import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';
import {ActivatedRoute, Router} from '@angular/router';

@Guide({
  id: 'state-management',
  title: 'State Management',
  description: 'Demonstrates pane area state management. What state is handled and why.'
})
@Component({
  selector: 'app-state-management-guide',
  templateUrl: './state-management-guide.component.html',
  styleUrls: ['./state-management-guide.component.scss']
})
export class StateManagementGuideComponent implements OnInit {

  usageExample =
    `<ngx-pane-area>
  <ngx-pane-group align="start">
    <ngx-pane title="Pane #1">First Pane</ngx-pane>
    <ngx-pane title="Pane #2">Second Pane</ngx-pane>
  </ngx-pane-group>  
  <ngx-pane-group align="end">
    <ngx-pane title="Pane #3">Third Pane</ngx-pane>
  </ngx-pane-group>  
</ngx-pane-area>`;
  private widths: (number | undefined)[];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.widths = [
        parseInt(params.w1, 10) || undefined,
        parseInt(params.w2, 10) || undefined,
        parseInt(params.w3, 10) || undefined,
      ];
    });
  }

  setWidth(index, width) {
    this.router.navigate(['.'], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        [`w${index + 1}`]: width
      }
    });
  }

}
