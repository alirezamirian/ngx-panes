import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DemoModel} from './demos/demos';
import {Observable} from 'rxjs/Observable';
import {DemoService} from './demo.service';

@Injectable()
export class DemoResolverService implements Resolve<DemoModel> {

  constructor(private demoService: DemoService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DemoModel | Observable<DemoModel> | Promise<DemoModel> {
    return this.demoService.getDemoById(route.params.demoId);
  }

}
