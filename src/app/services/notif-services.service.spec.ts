import { TestBed } from '@angular/core/testing';

import { NotifServicesService } from './notif-services.service';

describe('NotifServicesService', () => {
  let service: NotifServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
