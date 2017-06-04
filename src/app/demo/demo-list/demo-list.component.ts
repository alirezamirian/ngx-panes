import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DemoService} from '../demo.service';
import {DemoModel} from '../demos/demos';
import {ActivatedRoute, Router} from '@angular/router';
import {Tag} from '../tag';
import {BreadcrumbItem, getBreadcrumbItems} from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent implements OnInit, OnChanges {
  tags: Tag[];

  demos: DemoModel[];
  filteredDemos: DemoModel[];

  constructor(private demoService: DemoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.demos = this.demoService.getDemos();
    this.route.queryParams.subscribe(params => {
      this.tags = [].concat(params.tags || []);
      this.updateFilteredDemos();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.demos) {
      this.updateFilteredDemos();
    }
  }

  public removeTag(tag) {
    const tags = [...this.tags];
    if (tags.indexOf(tag) > -1) {
      tags.splice(tags.indexOf(tag), 1);
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {tags: tags}
    });
  }

  public addTag(tag) {
    const tags = [...this.tags];
    if (this.tags.indexOf(tag) < 0) {
      tags.push(tag);
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {...this.route.snapshot.queryParams, tags: tags}
    });
  }

  private updateFilteredDemos() {
    this.filteredDemos = this.demos.filter(demo => {
      return this.tags.every(tag => demo.metadata.tags.indexOf(tag) > -1);
    });
  }
}


export const demoListBreadcrumb: getBreadcrumbItems = function () {
  return <BreadcrumbItem>{
    url: 'demos',
    params: [],
    label: 'Demos'
  };
};
