function smallestCommons(arr) {
  let from = Math.min(...arr);
  let to = Math.max(...arr);
  let diff = to - from;
  let range = [];
  let mult = 1;
  while (range.length < (diff + 1)) {
    range.push(from);
    from++;
  }
  while (!range.every( e => ( mult % e === 0 ) ) ) {
    mult++;
  }
  return mult;
}


console.log(smallestCommons([1,13]));