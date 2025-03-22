import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start loading when startLoading is called', () => {
    service.startLoading();
    expect(service.loading).toBeTrue();
  });

  it('should stop loading when stopLoading is called', () => {
    service.startLoading();
    service.stopLoading();
    expect(service.loading).toBeFalse();
  });

  it('should have loading as false initially', () => {
    expect(service.loading).toBeFalse();
  });
});
