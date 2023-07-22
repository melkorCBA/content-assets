import { map, from } from "rxjs";

const items = [1, 2, 3, 4, 5];
const mapFunc = (item: number) =>
  item % 2 === 0 ? `${item} is even` : `${item} is odd`;

// Array map
items.map(mapFunc).forEach((i) => console.log(i));

// RxJS map
from(items)
  .pipe(map(mapFunc))
  .subscribe((i) => console.log(i));
