import {Component, Inject, OnInit} from '@angular/core';
import {Demo} from '../demos';
import {ActivatedRoute, Router} from '@angular/router';
import {GITHUB_BASE_URL} from './github-base-url';
import {HttpClient} from '@angular/common/http';
import {Github, GithubRateLimitStat, RateLimit} from './github-api-models';
import Branch = Github.Branch;

@Demo({
  id: 'github',
  title: 'Github Browser',
  description: 'A small application of ngx-panes for browsing a github repo content',
  order: 1000,
  tags: ['Basic Usage', 'Resizing'],
  defaultPath: 'alirezamirian/ngx-panes'
})
@Component({
  selector: 'app-github-browser-demo',
  templateUrl: './github-browser-demo.component.html',
  styleUrls: [
    '../../shared-demo-styles.scss',
    './github-browser-demo.component.scss'
  ],
  providers: [
    {
      provide: GITHUB_BASE_URL,
      useValue: 'https://api.github.com'
    }
  ]
})
export class GithubBrowserDemoComponent implements OnInit {
  sourceUrl = '/app/demo/demos/github-browser-demo/github-browser-demo.component.ts';
  repository: string;
  owner: string;
  private rateLimit: RateLimit;

  get slug() {
    if (this.repository && this.owner) {
      return `${this.owner}/${this.repository}`;
    }
  };

  panes = [];
  selectedBranch: string;
  branches: Branch[];

  get rateLimited() {
    return this.rateLimit && this.rateLimit.remaining <= 0;
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              @Inject(GITHUB_BASE_URL) private baseUrl: string,
              private httpClient: HttpClient) {
    this.owner = route.snapshot.params.p1;
    this.repository = route.snapshot.params.p2;
  }

  ngOnInit(): void {
    this.updateBranches();
    this.httpClient.get<GithubRateLimitStat>(`${this.baseUrl}/rate_limit`).subscribe(result => {
      this.rateLimit = result.rate;
    });
  }

  setSourceUrl(githubFileDto) {
    this.sourceUrl = githubFileDto.download_url;
  }

  addPane() {
    this.panes.push({
      title: `Dynamic tab ${this.panes.length + 1}`,
      content: `Content of dynamic tab ${this.panes.length + 1}`
    });
  }

  removePane(pane) {
    this.panes.splice(this.panes.indexOf(pane), 1);
  }

  setOwner(owner: string) {
    this.router.navigate([owner], {relativeTo: this.route});
  }

  setRepo(repo: string) {
    this.router.navigate([repo], {relativeTo: this.route});
    this.updateBranches();
  }

  private updateBranches() {
    if (this.slug) {
      this.httpClient.get<Branch[]>(`${this.baseUrl}/repos/${this.slug}/branches`)
        .subscribe((branches: Branch[]) => {
          this.branches = branches;
          const masterOrLast = (branch, index) => branch.name === 'master' || index === branches.length - 1;
          this.selectedBranch = branches.find(masterOrLast).name;
        });
    }
  }
}

