import {inject, TestBed} from '@angular/core/testing';

import {PaneGroupService} from './pane-group.service';

describe('PaneGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaneGroupService]
    });
  });

  it('should be created', inject([PaneGroupService], (service: PaneGroupService) => {
    expect(service).toBeTruthy();
  }));
});
