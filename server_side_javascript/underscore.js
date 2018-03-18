const _ = require('underscore');
var arr = [3, 6, 9, 1, 12];
// 자바스크립트는 배열의 기능이 빈약한데 _가 그것을 채워준다
console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]);
console.log(_.last(arr));
