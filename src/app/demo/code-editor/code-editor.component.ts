import {AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit {
  loading: boolean;
  _code = '';
  cm: any;

  @Input() set sourceUrl(value: string) {
    this.loading = true;
    this.http.get(value).subscribe(res => {
      this.code = res.text();
      this.loading = false;
      if (this.cm) {
        setTimeout(() => this.cm.refresh());
      }
    });
  }

  private set code(value) {
    if (this.cm) {
      this.cm.getDoc().setValue(value);
    } else {
      this._code = value;
    }
  };

  private get code() {
    return this._code;
  }


  @ViewChild('code') codeEl: ElementRef;

  constructor(private http: Http, private zone: NgZone) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // TODO: check for codemirror-related cleanup in ngDestroy
    this.zone.runOutsideAngular(() => {
      this.cm = new CodeMirror(this.codeEl.nativeElement, {
        value: this.code,
        mode: {
          name: 'javascript',
          typescript: true
        },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true
      });
    });
  }

}
