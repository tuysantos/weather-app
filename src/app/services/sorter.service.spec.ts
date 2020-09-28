import { inject, TestBed } from '@angular/core/testing';
import { SorterService } from './sorter.service';

describe('SorterService', () => {
  let service: SorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SorterService
      ]
    });
    service = TestBed.inject(SorterService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort desc collection', inject([SorterService], (service: SorterService) => {
      const data = [
          { title: 'bb'},
          { title: 'dd'},
          { title: 'aa'},
          { title: 'cc'},
      ];
      const result = service.sortBy(data, 'title', -1);
      expect(result[0].title).toEqual('aa');
  }));

  it('should sort asc collection', inject([SorterService], (service: SorterService) => {
    const data = [
        { title: 'bb'},
        { title: 'dd'},
        { title: 'aa'},
        { title: 'cc'},
    ];
    const result = service.sortBy(data, 'title', 1);
    expect(result[0].title).toEqual('dd');
}));

  it('should string be true', inject([SorterService], (service: SorterService) => {
    const result = service.isString('title');
    expect(result).toBe(true);
  }));

  it('should string be false', inject([SorterService], (service: SorterService) => {
    const result = service.isString(1234);
    expect(result).toBe(false);
  }));
});
