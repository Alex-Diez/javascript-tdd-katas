export default class Calculator {
  constructor(src) {
    this.src = src;
    this.index = 0;
  }

  compute() {
    const a = this.parseTerm();
    const sign = this.src[this.index];
    if (sign === '+') {
      this.index += 1;
      const b = this.parseTerm();
      return Promise.all([a, b]).then(values => values[0] + values[1]);
    } else if (sign === '-') {
      this.index += 1;
      const b = this.parseTerm();
      return Promise.all([a, b]).then(values => values[0] - values[1]);
    } else {
      return Promise.resolve(a);
    }
  }

  parseTerm() {
    const a = this.parseNum();
    const sign = this.src[this.index];
    if (sign === '*') {
      this.index += 1;
      const b = this.parseNum();
      return Promise.all([a, b]).then(values => values[0] * values[1]);
    } else if (sign === '/') {
      this.index += 1;
      const b = this.parseNum();
      return Promise.all([a, b]).then(values => values[0] / values[1]);
    } else {
      return Promise.resolve(a);
    }
  }

  parseNum() {
    const start = this.index;
    while (this.index < this.src.length && !isNaN(this.src[this.index])) {
      this.index += 1;
    }
    return Promise.resolve(Number(this.src.substring(start, this.index)));
  }
}
