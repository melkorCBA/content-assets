import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SlowTyperService {
  private static readonly DELAY_IN_SECONDS = 500;
  private static readonly CHARACTERS: string[] = [
    'I',
    ' ',
    'a',
    'm',
    ' ',
    's',
    'l',
    'o',
    'w',
    ' ',
    't',
    'y',
    'p',
    'e',
    'r',
    '.',
  ];

  typeStream$ = from(SlowTyperService.CHARACTERS).pipe(
    concatMap((ch) => of(ch).pipe(delay(SlowTyperService.DELAY_IN_SECONDS)))
  );
  constructor() {}
}
