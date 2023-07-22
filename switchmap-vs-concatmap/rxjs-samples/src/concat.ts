import { from, concat } from "rxjs";

const odds = [1, 3, 5];
const evens = [2, 4];

// Array concat
odds.concat(evens).forEach((item) => console.log(item));

// RxJS concat
concat(from(odds), from(evens)).subscribe((item) => console.log(item));
