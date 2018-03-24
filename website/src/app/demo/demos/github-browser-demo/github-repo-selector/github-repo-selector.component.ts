import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {GithubRepo, GithubSearchResult} from '../github-api-models';

@Component({
  selector: 'app-github-repo-selector',
  templateUrl: './github-repo-selector.component.html',
  styleUrls: ['./github-repo-selector.component.scss']
})
export class GithubRepoSelectorComponent implements AfterViewInit, OnInit {

  @Input()
  user: string;

  @Output()
  selected = new EventEmitter();

  @ViewChild('input', {read: ElementRef})
  inputEl: ElementRef;
  repos: GithubRepo[];
  private suggestions$: Observable<GithubRepo[]>;
  private loading: boolean;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.loading = true;
      this.httpClient.get<GithubRepo[]>(`https://api.github.com/users/${this.user}/repos`, {
        params: {
          per_page: '8',
          sort: 'updated'
        }
      }).subscribe((repos) => {
        this.loading = false;
        this.repos = repos;
      });
    }
  }

  ngAfterViewInit(): void {
    this.inputEl.nativeElement.focus();
    this.suggestions$ = fromEvent(this.inputEl.nativeElement, 'input').pipe(
      debounceTime(300),
      switchMap(() => this.httpClient.get<GithubSearchResult<GithubRepo>>(
        'https://api.github.com/search/repositories', {
          params: {
            q: this.inputEl.nativeElement.value + ` user:${this.user}`,
            per_page: '7'
          }
        })),
      map(response => response.items)
    );

    this.suggestions$.subscribe(items => {
      console.log(items);
    });
  }

}
