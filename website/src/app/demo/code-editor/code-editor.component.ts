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
    if (value) {
      this.loading = true;
      this.http.get(value).subscribe(res => {
        this.source = res.text();
      }, null, () => this.loading = false);
    }
  }

  @Input()
  public set source(value) {
    if (value) {
      if (this.cm) {
        this.cm.getDoc().setValue(value);
      } else {
        this._code = value;
        this.initCodemirror();
      }
      setTimeout(() => this.cm.refresh());
    }
  };

  public get source() {
    return this._code;
  }


  @ViewChild('code') codeEl: ElementRef;

  constructor(private http: Http, private zone: NgZone) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // TODO: check for codemirror-related cleanup in ngDestroy
    if (this.source) {
      this.initCodemirror();
    }
  }

  private initCodemirror() {
    this.zone.runOutsideAngular(() => {
      this.cm = new CodeMirror(this.codeEl.nativeElement, {
        value: this.source,
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
