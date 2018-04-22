import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemoModel} from '../demos/demos';
import {WithSidenavComponent} from '../../with-sidenav/with-sidenav.component';

@Component({
  selector: 'app-routed-demo',
  templateUrl: './routed-demo.component.html',
  styleUrls: ['./routed-demo.component.scss']
})
export class RoutedDemoComponent implements OnInit, OnDestroy {

  @ViewChild('outlet', {read: ViewContainerRef}) private outlet: ViewContainerRef;
  demoComponentRef: ComponentRef<{}>;
  demoModel: DemoModel;

  constructor(private route: ActivatedRoute,
              private withSidenav: WithSidenavComponent,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.withSidenav.hideSidenav();
    this.route.data
      .subscribe((data: { demoModel: DemoModel }) => {
        this.outlet.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.demoModel.component);
        this.demoComponentRef = this.outlet.createComponent(componentFactory);
        this.demoModel = data.demoModel;
      });
  }

  ngOnDestroy(): void {
    this.withSidenav.showSidenav();
  }
}
