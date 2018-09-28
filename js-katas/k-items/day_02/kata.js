export default class Filter {
  static async kItems(items, k) {
    let max = [];
    for (let i = 0; i < k; i++) {
      max.push(items[i]);
    }
    for (let i = k; items.length > i; i++) {
      let j = 0;
      while (j < k && items[i] <= max[j]) {
        j += 1;
      }
      if (j < k) {
        max[j] = items[i];
      }
    }
    return {numbers: max};
  }
}
