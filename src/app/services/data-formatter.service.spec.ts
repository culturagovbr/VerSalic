/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataFormatterService } from './data-formatter.service';

describe('DataFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFormatterService]
    });
  });

  it('should ...', inject([DataFormatterService], (service: DataFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
