import {Component} from '@angular/core';
import {Demo} from '../demos';
import {PANES_DEFAULTS, PanesDefaults} from '../../../../../../lib/panes-config';

@Demo({
  id: 'config',
  title: 'Configuring Defaults',
  description: 'An example of providing default configuration for all child panes',
  tags: ['Config']
})
@Component({
  selector: 'app-config-demo',
  templateUrl: './config-demo.component.html',
  styleUrls: ['./config-demo.component.scss'],
  providers: [
    {provide: PANES_DEFAULTS, useValue: {resizable: false, toggleable: false} as PanesDefaults}
  ]
})
export class ConfigDemoComponent {
}
