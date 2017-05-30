import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'ngx-github-issue-list',
  templateUrl: './github-issue-list.component.html',
  styleUrls: ['./github-issue-list.component.scss']
})
export class GithubIssueListComponent implements OnInit, OnChanges {

  issues;
  @Input()
  slug: string;

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slug && this.slug) {
      this.loadIssues();
    }
  }

  private loadIssues() {
    this.http.get(`https://api.github.com/repos/${this.slug}/issues`)
      .subscribe(res => this.issues = res.json());
  }
}
