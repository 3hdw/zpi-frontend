import { TestBed } from '@angular/core/testing';

import { SocketInterceptorService } from './socket-interceptor.service';

describe('SocketInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketInterceptorService = TestBed.get(SocketInterceptorService);
    expect(service).toBeTruthy();
  });
});
