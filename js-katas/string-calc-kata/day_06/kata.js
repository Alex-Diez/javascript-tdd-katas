export default class Calculator {
  static async compute(src) {
    return this._parseExpression({src: src, index: 0})
  }

  static async _parseExpression({src, index}) {
    let node = await this._parseTerm({src: src, index: index});
    let result = node.num;
    let i = node.index;
    while (i < src.length && '+-'.includes(src[i])) {
      node = await this._parseTerm({src: src, index: i + 1});
      switch (src[i]) {
        case '+':
          result += node.num;
          break;
        case '-':
          result -= node.num;
          break;
      }
      i = node.index;
    }
    return {number: result, index: i};
  }

  static async _parseTerm({src, index}) {
    let node = await this._parseNumber({src: src, index: index});
    let result = node.num;
    let i = node.index;
    while (i < src.length && '*/'.includes(src[i])) {
      node = await this._parseNumber({src: src, index: node.index + 1});
      switch (src[i]) {
        case '*':
          result *= node.num;
          break;
        case '/':
          result /= node.num;
          break;
      }
      i = node.index;
    }
    return {num: result, index: i};
  }

  static async _parseNumber({src, index}) {
    const start = index;
    let end = index;
    while (end < src.length && !'+-*/()'.includes(src[end])) {
      end += 1;
    }
    if (src[end] === '(') {
      const ret = await this._parseExpression({src: src, index: end + 1});
      return {num: ret.number, index: ret.index + 1};
    }
    return {num: Number(src.substring(start, end)), index: end};
  }
}
