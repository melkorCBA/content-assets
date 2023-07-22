import { from, of, concatMap, switchMap, delay } from "rxjs";

const items = [1, 2, 3, 4, 5];
const mapFunc = (item: number) =>
  item % 2 === 0 ? `${item} is even` : `${item} is odd`;

const isOdd = (item: number) => of(mapFunc(item)).pipe(delay(1000));

from(items)
  .pipe(concatMap((item) => isOdd(item)))
  .subscribe((s) => console.log(s));

from(items)
  .pipe(switchMap((item) => isOdd(item)))
  .subscribe((s) => console.log(s));
