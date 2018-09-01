export default class Calculator {
  constructor(src) {
    this.src = src;
    this.index = 0;
  }

  compute() {
    const a = this.parseNum();
    const sign = this.parseSign();
    const b = this.parseNum();
    return Promise.all([a, sign, b])
      .then((values) => {
        if (values[1] === '+') {
          return values[0] + values[2];
        } else {
          return values[0] - values[2];
        }
      })
  }

  parseNum() {
    const start = this.index;
    while (this.index < this.src.length && !isNaN(this.src[this.index])) {
      this.index += 1;
    }
    return Promise.resolve(Number(this.src.substring(start, this.index)));
  }

  parseSign() {
    return Promise.resolve(this.src[this.index++]);
  }
}
