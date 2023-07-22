const { of, timer } = Rx;
const { delay, take, map, concatMap, switchMap } = RxOperators;

const mapFunc = (item) => (item % 2 === 0 ? `${item} e` : `${item} o`);
const isOdd = (item) => of(mapFunc(item)).pipe(delay(1000));

// 1. values emited ervey 0.5 seconds
timer(0, 500).pipe(
  map((v) => v + 1),
  take(5)
);
// 2. concatMap with 1 second delay for inner Observables
timer(0, 500).pipe(
  map((v) => v + 1),
  take(5),
  concatMap(isOdd)
);
// 3. switchMap with 1 second delay for inner Observables
timer(0, 500).pipe(
  map((v) => v + 1),
  take(5),
  switchMap(isOdd)
);
