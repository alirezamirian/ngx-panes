import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProviderSearchResult, SearchResult} from '../core/search/search-provider';
import {SearchService} from '../core/search/search.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchInputFocused: boolean;
  convertResult: () => string;

  queries$ = new Subject<string>();

  @ViewChild(MatAutocomplete)
  private autocomplete: MatAutocomplete;

  @ViewChild('searchInput', {read: ElementRef})
  private searchInput: ElementRef;

  private results$: Observable<ProviderSearchResult[]>;
  private searching: boolean;


  constructor(private searchService: SearchService, private router: Router) {
    this.convertResult = () => '';
  }

  ngOnInit() {
    this.results$ = this.queries$.pipe(
      debounceTime(300),
      tap(() => this.searching = true),
      switchMap(query => this.searchService.search(query)),
      tap(() => this.searching = false)
    );

    this.results$.subscribe(results => {
      console.log(results);
    });
  }

  select(event: MatAutocompleteSelectedEvent) {
    const result: SearchResult = event.option.value;
    if (result.url) {
      this.router.navigateByUrl(result.url);
    }
    this.searchInput.nativeElement.blur();
  }

  open() {
    this.searchInputFocused = true;
  }

  close() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.blur(); // for when closing search with an event other than blur (like pressing esc)
    this.queries$.next('');
    this.searchInputFocused = false;
  }
}
