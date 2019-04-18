import { TestBed } from '@angular/core/testing';

import { AddressStorageService } from './address-storage.service';

describe('AddressStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressStorageService = TestBed.get(AddressStorageService);
    expect(service).toBeTruthy();
  });
});
