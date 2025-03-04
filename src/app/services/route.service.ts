import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable, Signal } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private _route: ActivatedRoute) { }

  getRouteParam = <T>(getFn: (paramMap: ParamMap, index?: number) => T, initialValue: T) => {
    const param$ = this._route.paramMap.pipe(
      map(getFn)
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toSignal<T>(param$, { initialValue: initialValue as any }) as Signal<T>;
  };
  
  getRouteData = <T>(getFn: (data: Data, index?: number) => T, initialValue: T) => {
    const route = inject(ActivatedRoute);
    const data$ = route.data.pipe(
      map(getFn)
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toSignal<T>(data$, { initialValue: initialValue as any })as Signal<T>;
  }
}
