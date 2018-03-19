import {Component, OnInit} from '@angular/core';
import {ApiDocsService} from '../../core/api-docs.service';
import {DocItemBase} from '../../core/doc-item';

@Component({
  selector: 'app-api-docs',
  templateUrl: './api-docs.component.html',
  styleUrls: ['./api-docs.component.scss']
})
export class ApiDocsComponent implements OnInit {
  private docs: DocItemBase[];

  constructor(private apiDocsService: ApiDocsService) {
  }

  ngOnInit() {
    this.apiDocsService.getDocs().subscribe(docs => {
      this.docs = docs.map((doc: DocItemBase) => {
        let letterIcon = doc.type ? doc.type.charAt(0).toUpperCase() : 'T';
        if (letterIcon === 'D' && doc.isComponent) {
          letterIcon = 'C';
        }
        if (letterIcon === 'N') {
          letterIcon = 'M';
        }
        return Object.assign({}, doc, {letterIcon});
      });
    });
  }

}
