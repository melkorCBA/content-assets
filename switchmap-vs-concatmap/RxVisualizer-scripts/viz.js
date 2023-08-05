const { of, timer, from } = Rx;
const { delay, take, map, concatMap, switchMap } = RxOperators;

const mapFunc = (item) => (item % 2 === 0 ? `${item} e` : `${item} o`);
const isOdd = (item) => of(mapFunc(item)).pipe(delay(1000));

// 1. values emited ervey 0.5 seconds
const bgTimer$ = timer(0, 500).pipe(
  map((v) => `${v / 2}s`),
  take(13)
);
// 2. concatMap with 1 second delay for inner Observables
const cmap$ = timer(0, 500).pipe(
  map((v) => v + 1),
  take(5),
  concatMap(isOdd)
);
// 3. switchMap with 1 second delay for inner Observables
const smap$ = timer(0, 500).pipe(
  map((v) => v + 1),
  take(5),
  switchMap(isOdd)
);

from([bgTimer$, smap$, cmap$]);
