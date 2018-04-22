import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-fab-expandable',
  templateUrl: './fab-expandable.component.html',
  styleUrls: ['./fab-expandable.component.scss'],
  animations: [
    trigger('closeBtn', [
      state('*', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      state('void', style({
        transform: 'scale(0)',
        opacity: 0
      })),
      transition(':leave', animate(100)),
      transition(':enter', animate('100ms 200ms'))
    ]),
    trigger('content', [
      state('*', style({
        opacity: 1
      })),
      state('void', style({
        opacity: 0
      })),
      transition(':enter', animate('10ms 100ms')),
      transition(':leave', animate('300ms'))
    ])
  ]
})
export class FabExpandableComponent implements OnInit {

  @Input()
  icon: string;

  @Input()
  tooltip: string;

  expanded = false;

  constructor() {
  }

  ngOnInit() {
  }

}
