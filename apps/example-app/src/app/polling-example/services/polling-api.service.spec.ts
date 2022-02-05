import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PollingApiService } from './polling-api.service';

describe('PollingApiService', () => {
  let service: PollingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PollingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
