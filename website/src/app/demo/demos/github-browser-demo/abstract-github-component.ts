import {OnChanges, SimpleChanges} from '@angular/core';
import {Http} from '@angular/http';

/**
 * Created by alireza on 6/1/17.
 */


export abstract class AbstractGithubComponent implements OnChanges {
  loading: boolean;
  slug: string;

  constructor(private http: Http, private resource: string) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slug && this.slug) {
      this.loadItems();
    }
  }

  abstract setItems(items: any[]): void;

  protected loadItems() {
    this.loading = true;
    this.http.get(`https://api.github.com/repos/${this.slug}/${this.resource}`)
      .subscribe(res => this.setItems(res.json()), null, () => {
        this.loading = false;
      });
  }
}
