import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ApiDocsService} from '../core/api-docs.service';

@Injectable()
export class DocItemResolverGuard implements Resolve<any> {
  constructor(private apiDocsService: ApiDocsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.apiDocsService.getDocByClassName(route.params.className);
  }

}
