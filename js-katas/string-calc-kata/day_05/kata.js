export default class Calculator {
  static compute(src) {
    let node = this._parseTerm({src: src, index: 0});
    let i = node.index;
    let num = node.num;
    while (i < src.length && '+-'.includes(src[i])) {
      node = this._parseTerm({src: src, index: i + 1});
      switch (src[i]) {
        case '+':
          num += node.num;
          break;
        case '-':
          num -= node.num;
          break;
      }
      i = node.index;
    }
    return Promise.resolve({number: num, index: i});
  }

  static _parseTerm({src, index}) {
    let node = this._parseNumber({src: src, index: index});
    let i = node.index;
    let num = node.num;
    while (i < src.length && '*/'.includes(src[i])) {
      node = this._parseNumber({src: src, index: i + 1});
      switch (src[i]) {
        case '*':
          num *= node.num;
          break;
        case '/':
          num /= node.num;
          break;
      }
      i = node.index;
    }
    return {num: num, index: i};
  }

  static _parseNumber({src, index}) {
    const start = index;
    let end = index;
    while (end < src.length && !'+-*/'.includes(src[end])) {
      end += 1;
    }
    return {num: Number(src.substring(start, end)), index: end}
  }
}
