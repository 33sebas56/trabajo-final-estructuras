import { TestBed } from '@angular/core/testing';

import { PedidosService } from '../../service/pedidos.service';

describe('PedidosService', () => {
  let service: PedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
