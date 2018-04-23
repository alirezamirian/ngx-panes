import {Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractGithubComponent} from '../abstract-github-component';
import {GithubRelease} from '../github-api-models';
import PullRequest = GithubRelease.PullRequest;

@Component({
  selector: 'app-github-pull-requests',
  templateUrl: './github-pull-requests.component.html',
  styleUrls: ['./github-pull-requests.component.scss']
})
export class GithubPullRequestsComponent extends AbstractGithubComponent {

  items: PullRequest[];

  @Input()
  slug: string;

  constructor(http: Http) {
    super(http, 'pulls');
  }

  setItems(items: any[]): void {
    this.items = items;
  }

}
