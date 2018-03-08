import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GuideModel} from './guides';
import {GuideService} from '../core/guide.service';

@Injectable()
export class GuideResolverService implements Resolve<GuideModel> {

  constructor(private service: GuideService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GuideModel | Observable<GuideModel> | Promise<GuideModel> {
    return this.service.getById(route.params.id);
  }

}
