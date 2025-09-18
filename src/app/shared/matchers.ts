import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

export const isHandsetMatch: CanMatchFn = (): Observable<boolean> => {
  const bo: BreakpointObserver = inject(BreakpointObserver);
  return bo.observe(Breakpoints.Handset).pipe(
    map((state: BreakpointState): boolean => state.matches),
    take(1)
  );
};

export const isDesktopMatch: CanMatchFn = (): Observable<boolean> => {
  const bo: BreakpointObserver = inject(BreakpointObserver);
  return bo.observe(Breakpoints.Handset).pipe(
    map((state: BreakpointState): boolean => !state.matches),
    take(1)
  );
};
