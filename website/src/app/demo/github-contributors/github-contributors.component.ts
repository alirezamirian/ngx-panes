import {Component, Input} from '@angular/core';
import {AbstractGithubComponent} from '../abstract-github-component';
import {Http} from '@angular/http';

@Component({
  selector: 'app-github-contributors',
  templateUrl: './github-contributors.component.html',
  styleUrls: ['./github-contributors.component.scss']
})
export class GithubContributorsComponent extends AbstractGithubComponent {
  contributors: any[];

  @Input()
  slug: string;

  constructor(http: Http) {
    super(http, 'contributors');
  }

  setItems(items: any[]): void {
    this.contributors = items;
  }


}
