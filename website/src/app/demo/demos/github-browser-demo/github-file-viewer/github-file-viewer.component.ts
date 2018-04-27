import {Component, Inject, Input, OnInit} from '@angular/core';
import {ObservableInput} from 'observable-input/lib';
import {Observable} from 'rxjs/Observable';
import {catchError, filter, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {GITHUB_BASE_URL} from '../github-base-url';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-github-file-viewer',
  templateUrl: './github-file-viewer.component.html',
  styleUrls: ['./github-file-viewer.component.scss']
})
export class GithubFileViewerComponent implements OnInit {

  @Input('url') @ObservableInput()
  fileUrl$: Observable<string>;
  isMarkdown = false;
  private source$: Observable<string>;
  private url: string;

  constructor(private httpClient: HttpClient, @Inject(GITHUB_BASE_URL) private githubApiBase: string) {
  }

  ngOnInit() {
    this.isMarkdown = false;
    this.source$ = this.fileUrl$.pipe(
      filter(url => !!url),
      tap((url: string) => {
        this.isMarkdown = url.slice(-3).toLowerCase() === '.md';
        this.url = url;
      }),
      switchMap(url => this.httpClient.get(url, {responseType: 'text'})),
      switchMap(content => {
        if (this.isMarkdown) {
          return this.httpClient.post(`${this.githubApiBase}/markdown`, {
            text: content,
            mode: 'gfm',
            context: this.url.split('/').slice(3, 4).join('/')
          }, {responseType: 'text'}).pipe(
            catchError((errorResponse => of(JSON.parse(errorResponse.error).message)))
          );
        }
        return of(content);
      })
    );
  }

}
