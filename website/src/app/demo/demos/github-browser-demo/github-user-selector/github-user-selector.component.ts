import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {GithubSearchResult, GithubUser} from '../github-api-models';

@Component({
  selector: 'app-github-user-selector',
  templateUrl: './github-user-selector.component.html',
  styleUrls: ['./github-user-selector.component.scss']
})
export class GithubUserSelectorComponent implements AfterViewInit {

  @Output()
  selected = new EventEmitter();

  @ViewChild('input', {read: ElementRef})
  inputEl: ElementRef;
  private suggestions$: Observable<GithubUser[]>;

  constructor(private httpClient: HttpClient) {
  }

  ngAfterViewInit() {
    this.inputEl.nativeElement.focus();
    this.suggestions$ = fromEvent(this.inputEl.nativeElement, 'input').pipe(
      debounceTime(300),
      switchMap(() => this.httpClient.get<GithubSearchResult<GithubUser>>('https://api.github.com/search/users', {
        params: {
          q: this.inputEl.nativeElement.value,
          per_page: '10'
        }
      })),
      map(response => response.items)
    );

    this.suggestions$.subscribe(items => {
      console.log(items);
    });
  }

}
