import {AfterContentInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';

import * as hljs from 'highlight.js';
import {MatTooltip} from '@angular/material';
import {HttpClient} from '@angular/common/http';

hljs.configure({
  useBR: true
});

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit, AfterContentInit {

  // TODO: add line numbers (use Prism instead of hljs)
  loading = false;
  private _source: string;
  public sourceHtml: string;
  @ViewChild('content') content: ElementRef;
  @Input() language: string;

  @Input()
  autoFormat = true;

  @Input()
  copy = true;

  @HostBinding('class.flat')
  @Input()
  flat = false;

  @Input() set source(value: string) {
    value = value || '';
    const result = hljs.highlightAuto(value, this.language ? [this.language] : undefined);
    this._source = value;
    this.sourceHtml = result.value;
    this.language = result.language;
  }

  @Input() set sourceUrl(value: string) {
    if (value) {
      this.loading = true;
      this.httpClient.get(value, {responseType: 'text'}).subscribe(source => {
        this.source = source;
      }, null, () => this.loading = false);
    }
  }

  get source() {
    let source = this._source;
    if (!source) {
      source = this.content.nativeElement.innerText;
    }
    console.log('source', source);
    return source;
  }

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    hljs.highlightBlock(this.content.nativeElement);
  }

  copyToClipboard(tooltip: MatTooltip) {
    console.log(tooltip);
    const prevMessage = tooltip.message;
    const result = copyTextToClipboard(this.source);
    setTimeout(() => {
      tooltip.message = result ? 'Copied' : 'Not Copied!';
      tooltip.show();
    });
    setTimeout(() => {
      tooltip.hide();
    }, 1000);
    setTimeout(() => tooltip.message = prevMessage, 1500);
  }
}


function copyTextToClipboard(text) {
  const textArea = document.createElement('textarea');

  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    return document.execCommand('copy');
  } catch (err) {
    return false;
  }
  finally {
    document.body.removeChild(textArea);
  }
}
