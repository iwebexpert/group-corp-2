class Filling{
  constructor(name){
    this.name = name;
  };
};

class Cheese extends Filling{
  constructor(name){
    super('cheese');
    this.price = 10;
    this.calories = 20;
  };
};

class Salad extends Filling{
  constructor(name){
    super('salad');
    this.price = 20;
    this.calories = 5;
  };
};

class Potato extends Filling{
  constructor(name){
    super('potato');
    this.price = 15;
    this.calories = 10;
  };
};
