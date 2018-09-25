export default class Calculator {
  static async compute(src) {
    let {number: result, index: i} = await this._parseTerm({src: src, index: 0});
    while (i < src.length && '+-'.includes(src[i])) {
      const node = await this._parseTerm({src: src, index: i + 1});
      if (src[i] === '+') {
        result += node.number;
      } else if (src[i] === '-') {
        result -= node.number;
      }
      i = node.index;
    }
    return {number: result, index: i};
  }

  static async _parseTerm({src, index}) {
    let {number: result, index: i} = await this._parseNumber({src: src, index: index});
    while (i < src.length && '*/'.includes(src[i])) {
      const node = await this._parseNumber({src: src, index: i + 1});
      if (src[i] === '*') {
        result *= node.number;
      } else if (src[i] === '/') {
        result /= node.number;
      }
      i = node.index;
    }
    return {number: result, index: i};
  }

  static async _parseNumber({src, index}) {
    const start = index;
    let end = index;
    while (end < src.length && !'+-*/'.includes(src[end])) {
      end += 1;
    }
    return {number: Number(src.substring(start, end)), index: end};
  }
}
