import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GuideModel} from '../guides';

@Component({
  selector: 'app-routed-guide',
  templateUrl: './routed-guide.component.html',
  styleUrls: ['./routed-guide.component.scss']
})
export class RoutedGuideComponent implements OnInit {

  @ViewChild('outlet', {read: ViewContainerRef}) private outlet: ViewContainerRef;

  constructor(private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { guideModel: GuideModel }) => {
        this.outlet.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(data.guideModel.component);
        this.outlet.createComponent(componentFactory);
      });
  }
}
