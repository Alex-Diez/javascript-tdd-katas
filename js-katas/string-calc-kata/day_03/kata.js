export default class Calculator {
  constructor(src) {
    this.src = src;
  }

  compute() {
    let i = 0;
    const src = this.src;
    let num = this.parseTerm({ index: i, src: src });
    let result = num.number;
    i = num.index;
    while (i < src.length) {
      if (src[i] == '+') {
        num = this.parseTerm({ index: i + 1, src: src });
        result += num.number;
        i = num.index;
      } else if (src[i] == '-') {
        num = this.parseTerm({ index: i + 1, src: src });
        result -= num.number;
        i = num.index;
      } else {
        break;
      }
    }
    return Promise.resolve({ index: i, number: result });
  }

  parseTerm({ index, src }) {
    let i = index;
    let num = this.parseNumber({ index: i, src: src });
    let result = num.number;
    i = num.index;
    while (i < src.length) {
      if (src[i] == '*') {
        num = this.parseNumber({ index: i + 1, src: src });
        result *= num.number;
        i = num.index;
      } else if(src[i] == '/') {
        num = this.parseNumber({ index: i + 1, src: src });
        result /= num.number;
        i = num.index;
      } else {
        break;
      }
    }
    return { index: i, number: result };
  }

  parseNumber({ index, src }) {
    const start = index;
    let end = index;
    while (end < src.length && src[end] != '+' && src[end] != '-' && src[end] != '*' && src[end] != '/') {
      end += 1;
    }
    return { index: end, src: src, number: Number(src.substring(start, end)) };
  }
}
