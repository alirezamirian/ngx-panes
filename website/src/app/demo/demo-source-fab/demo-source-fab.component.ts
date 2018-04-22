import {Component, OnInit} from '@angular/core';
import {RoutedDemoComponent} from '../routed-demo/routed-demo.component';
import {DemoMeta} from '../demos/demos';
import {decorate} from 'core-decorators';
import {memoize} from 'lodash';

@Component({
  selector: 'app-demo-source-fab',
  templateUrl: './demo-source-fab.component.html',
  styleUrls: ['./demo-source-fab.component.scss']
})
export class DemoSourceFabComponent implements OnInit {

  get demoMeta(): DemoMeta {
    return this.routedDemo.demoModel.metadata;
  }

  constructor(private routedDemo: RoutedDemoComponent) {
  }

  ngOnInit() {
  }

  @decorate(memoize, (demoMeta: DemoMeta, extension: string) => demoMeta.className + extension)
  getPath(demoMeta: DemoMeta, extension: string) {
    console.log('getPath called', arguments);
    const name = camelCaseToDash(demoMeta.className).split('-').slice(0, -1).join('-');
    return `https://raw.githubusercontent.com/alirezamirian/ngx-panes/master/website/src/app/demo/demos/${name}/${name}.component.${extension}`;
  }
}

function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}
