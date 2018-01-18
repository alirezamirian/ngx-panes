import {AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import * as hljs from 'highlight.js';
import {MdTooltip} from '@angular/material';

hljs.configure({
  useBR: true
});

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit, AfterContentChecked {

  // TODO: add line numbers (use Prism instead of hljs)
  loading = false;
  private _source: string;
  public sourceHtml: string;
  @ViewChild('content') content: ElementRef;
  @Input() language: string;

  @Input()
  autoFormat = true;

  @Input() set source(value: string) {
    value = value || '';
    const result = hljs.highlightAuto(value, this.language ? [this.language] : undefined);
    this._source = value;
    this.sourceHtml = result.value;
    this.language = result.language;
  }

  get source() {
    return this._source;
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    hljs.highlightBlock(this.content.nativeElement);
  }

  copyToClipboard(tooltip: MdTooltip) {
    console.log(tooltip);
    const prevMessage = tooltip.message;
    const result = copyTextToClipboard(this._source);
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
