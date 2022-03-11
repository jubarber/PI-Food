export function quickSort(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.flat().length; i++) {
    if (array.flat()[i]) {
      if (array.flat()[i].title < pivot.title) {
        left.push(array.flat()[i]);
      } else if (array.flat()[i].title > pivot.title) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }

  let orderAsc = quickSort(left).concat(equal).concat(quickSort(right));
  return orderAsc;
}

export function quickSortDesc(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.flat().length; i++) {
    if (array.flat()[i]) {
      if (array.flat()[i].title < pivot.title) {
        left.push(array.flat()[i]);
      } else if (array.flat()[i].title > pivot.title) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }

  let orderAsc = quickSort(left).concat(equal).concat(quickSort(right));
  let orderDesc = orderAsc.reverse();
  return orderDesc;
}

export function quickSortScore(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array
    .flat()
    [Math.floor(Math.random() * array.flat().length)].spoonacularScore
  let left = [];
  let right = [];
  let equal = [];
  let pivotInt = parseInt(pivot);

  for (let i = 0; i < array.flat().length; i++) {
    let s = array.flat()[i].spoonacularScore
    let score = parseInt(s);

    if (array.flat() !== "null") {
      if (score < pivotInt) {
        left.push(array.flat()[i]);
      } else if (score > pivotInt) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }

  let orderScoreAsc = quickSortScore(left)
    .concat(equal)
    .concat(quickSortScore(right));
  return orderScoreAsc;
}

export function quickSortScoreDesc(array) {
  if (array.flat().length <= 1) return array;

  let pivot =
    array.flat()[Math.floor(Math.random() * array.flat().length)]
      .spoonacularScore;
  let left = [];
  let right = [];
  let equal = [];
  let pivotInt = parseInt(pivot);

  for (let i = 0; i < array.flat().length; i++) {
    let s = array.flat()[i].spoonacularScore;
    let score = parseInt(s);

    if (array.flat()) {
      if (score < pivotInt) {
        left.push(array.flat()[i]);
      } else if (score > pivotInt) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }

  let orderScoreAsc = quickSortScoreDesc(left)
    .reverse()
    .concat(equal)
    .concat(quickSortScoreDesc(right).reverse());
  let orderScoreDesc = orderScoreAsc.reverse();
  return orderScoreDesc;
}

export function quickSortHealth(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.flat().length; i++) {
    if (array.flat()[i]) {
      if (parseInt(array.flat()[i].healthScore) < parseInt(pivot.healthScore)) {
        left.push(array.flat()[i]);
      } else if (
        parseInt(array.flat()[i].healthScore) > parseInt(pivot.healthScore)
      ) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }
  let orderHealthAsc = quickSortHealth(left)
    .concat(equal)
    .concat(quickSortHealth(right));
  return orderHealthAsc;
}

export function quickSortHealthDesc(array) {
  if (array.flat().length <= 1) return array;

  let pivot = array.flat()[Math.floor(Math.random() * array.flat().length)];
  let left = [];
  let right = [];
  let equal = [];

  for (let i = 0; i < array.flat().length; i++) {
    if (array.flat()[i]) {
      if (
        parseInt(array.flat()[i].healthyScore) < parseInt(pivot.healthyScore)
      ) {
        left.push(array.flat()[i]);
      } else if (
        parseInt(array.flat()[i].healthyScore) > parseInt(pivot.healthyScore)
      ) {
        right.push(array.flat()[i]);
      } else {
        equal.push(array.flat()[i]);
      }
    }
  }
  let orderHealthAsc = quickSortHealthDesc(left)
    .reverse()
    .concat(equal)
    .concat(quickSortHealthDesc(right).reverse());
  let orderHealthDesc = orderHealthAsc.reverse();
  return orderHealthDesc;
}
