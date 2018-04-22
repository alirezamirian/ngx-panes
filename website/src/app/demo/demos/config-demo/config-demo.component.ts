import {Component} from '@angular/core';
import {Demo} from '../demos';
import {NGX_PANES_DEFAULTS, NgxPanesDefaults} from '../../../../../../lib/panes-config';

@Demo({
  id: 'config',
  title: 'Configuring Defaults',
  description: 'An example of providing default configuration for all child panes',
  order: 4,
  tags: ['Config']
})
@Component({
  selector: 'app-config-demo',
  templateUrl: './config-demo.component.html',
  styleUrls: ['./config-demo.component.scss'],
  providers: [
    {provide: NGX_PANES_DEFAULTS, useValue: {resizable: false, toggleable: false} as NgxPanesDefaults}
  ]
})
export class ConfigDemoComponent {
}
