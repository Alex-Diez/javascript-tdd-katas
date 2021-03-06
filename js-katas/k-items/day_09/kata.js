export default class Filter {
  static async kItems(items, k) {
    let max = [];
    for (let i = 0; i < k; i += 1) {
      max[i] = items[i];
    }
    for (let i = k; i < items.length; i += 1) {
      let n = 0;
      while (n < k && items[i] <= max[n]) {
        n += 1;
      }
      if (n < k) {
        max[n] = items[i];
      }
    }
    return {numbers: max};
  }
}
