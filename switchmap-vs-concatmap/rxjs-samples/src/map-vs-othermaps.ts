import { map, from, of } from "rxjs";

const items = [1, 2, 3, 4, 5];
const mapFunc = (item: number) =>
  item % 2 === 0 ? `${item} is even` : `${item} is odd`;

const isOdd = (item: number) => of(mapFunc(item));

from(items)
  .pipe(map((item) => isOdd(item)))
  .subscribe((s) => console.log(s));
