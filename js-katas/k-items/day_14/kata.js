export default class Filter {
  static async kItems(items, k) {
    let max = [];
    for (let i = 0; i < k; i++) {
      max[i] = items[i];
    }
    for (let i = k; i < items.length; i++) {
      let n = 0;
      while (n < k && items[i] <= max[n]) {
        n++;
      }
      if (n < k) {
        max[n] = items[i];
      }
    }
    return {numbers: max};
  }
}
