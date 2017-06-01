import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemoModel} from '../demos/demos';

@Component({
  selector: 'app-routed-demo',
  templateUrl: './routed-demo.component.html',
  styleUrls: ['./routed-demo.component.scss']
})
export class RoutedDemoComponent implements OnInit {

  @ViewChild('outlet', {read: ViewContainerRef}) private outlet: ViewContainerRef;

  constructor(private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { demoModel: DemoModel }) => {
        this.outlet.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.demoModel.component);
        this.outlet.createComponent(componentFactory);
      });
  }

}
