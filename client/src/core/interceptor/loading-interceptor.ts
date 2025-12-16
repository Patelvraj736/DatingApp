import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { inject } from '@angular/core/primitives/di';
import { delay, of, tap } from 'rxjs';

const cache = new Map<string, any>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if(req.method === 'GET'){
    const cachedResponse = cache.get(req.url);
    if(cachedResponse){
      return  of(cachedResponse);
    }
  }

  busyService.busy();


  return next(req)
    .pipe(
      delay(500),
      tap((response: any)=>{
        cache.set(req.url, response);
      }),
      finalize(() => {

        busyService.idle();
      })
    );
};
