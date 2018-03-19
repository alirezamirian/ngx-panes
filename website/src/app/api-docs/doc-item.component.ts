import {Component, Input, OnInit} from '@angular/core';
import {ApiDocsService} from '../core/api-docs.service';

@Component({
  selector: 'app-doc-item',
  template: `
  <a [routerLink]="['/api', identifier]" *ngIf="exists">{{identifier}}</a>
  <ng-container *ngIf="!exists">{{identifier}}</ng-container>
  `,
})
export class DocItemComponent implements OnInit {

  @Input()
  identifier: string;

  exists: boolean;

  constructor(private apiDocsService: ApiDocsService) {
  }

  ngOnInit(): void {
    this.apiDocsService.getDocItem(this.identifier).then(docItem => {
      this.exists = <boolean> docItem && docItem.length;
    });
  }
}
