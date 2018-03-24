import {Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractGithubComponent} from '../abstract-github-component';
import {GithubRelease} from '../github-api-models';
import Release = GithubRelease.Release;

@Component({
  selector: 'app-github-release-list',
  templateUrl: './github-release-list.component.html',
  styleUrls: ['./github-release-list.component.scss']
})
export class GithubReleaseListComponent extends AbstractGithubComponent {

  releases: Release[];

  @Input()
  slug: string;

  constructor(http: Http) {
    super(http, 'releases');
  }

  setItems(items: any[]): void {
    this.releases = items;
  }

}
