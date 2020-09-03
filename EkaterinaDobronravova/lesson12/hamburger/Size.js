class Big extends Hamburger {
  constructor() {
    super('big');
    this.price = 100;
    this.caloric = 40;
    }
}

class Small extends Hamburger {
  constructor(price, caloric) {
    super('small');
    this.price = 50;
    this.caloric = 20;
  }
}
