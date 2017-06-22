import {Request, XSRFStrategy} from '@angular/http';

export class NoopXSRFStrategy implements XSRFStrategy {
  configureRequest(req: Request): void {
  }
}
