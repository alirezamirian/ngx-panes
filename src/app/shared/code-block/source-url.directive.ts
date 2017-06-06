import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CodeBlockComponent} from './code-block.component';
import {Http} from '@angular/http';

@Directive({
  selector: 'app-code-block[sourceUrl]'
})
export class CodeBlockSourceUrlDirective implements OnChanges {

  @Input('sourceUrl') url: string;

  constructor(private codeBlockComponent: CodeBlockComponent,
              private http: Http) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.url) {
      this.codeBlockComponent.loading = true;
      this.http.get(this.url)
        .subscribe(res => this.codeBlockComponent.source = res.text(), null, () => {
          this.codeBlockComponent.loading = false;
        });
    }
  }
}
