import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function isHandsetMatch(): Observable<boolean> {
  const bo: BreakpointObserver = inject(BreakpointObserver);
  return bo
    .observe([Breakpoints.Handset])
    .pipe(map((res: BreakpointState): boolean => res.breakpoints[Breakpoints.Handset] === true));
}

export function isDesktopMatch(): Observable<boolean> {
  const bo: BreakpointObserver = inject(BreakpointObserver);
  return bo
    .observe([Breakpoints.Web])
    .pipe(map((res: BreakpointState): boolean => res.breakpoints[Breakpoints.Web] === true));
}
