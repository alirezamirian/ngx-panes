import {AfterViewInit, Component, Input} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractGithubComponent} from '../abstract-github-component';

@Component({
  selector: 'app-github-issue-list',
  templateUrl: './github-issue-list.component.html',
  styleUrls: ['./github-issue-list.component.scss']
})
export class GithubIssueListComponent extends AbstractGithubComponent implements AfterViewInit {

  issues;

  @Input()
  slug: string;

  constructor(http: Http) {
    super(http, 'issues');
    console.log('issues, constructor');
  }


  ngAfterViewInit(): void {
    console.log('issues, afterViewInit');
  }

  setItems(items: any[]): void {
    this.issues = items;
  }

}
