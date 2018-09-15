export default class Calculator {
  constructor() {
    this.operators = '+-*/';
  }

  compute(src) {
    let node = this._parseTerm({start: 0, src: src});
    let num = node.num;
    let index = node.index;
    while (index < src.length) {
      if (src[index] === '+') {
        node = this._parseTerm({start: index + 1, src: src});
        num += node.num;
        index = node.index;
      } else if (src[index] === '-') {
        node = this._parseTerm({start: index + 1, src: src});
        num -= node.num;
        index = node.index;
      } else {
        break;
      }
    }
    return Promise.resolve({number: num});
  }

  _parseTerm({start, src}) {
    let node = this._parseNumber({start: start, src: src});
    let num = node.num;
    let index = node.index;
    while (index < src.length) {
      if (src[index] === '*') {
        node = this._parseNumber({start: index + 1, src: src});
        num *= node.num;
        index = node.index;
      } else if (src[index] === '/') {
        node = this._parseNumber({start: index + 1, src: src});
        num /= node.num;
        index = node.index;
      } else {
        break;
      }
    }
    return {num: num, index: index};
  }

  _parseNumber({start, src}) {
    let end = start;
    while (end < src.length && !this.operators.includes(src[end])) {
      end += 1;
    }
    return {num: Number(src.substring(start, end)), index: end};
  }
}
