class Additionally{
  constructor(name){
    this.name = name;
  };
};

class Seasoning extends Additionally{
  constructor(name){
    super('cheese');
    this.price = 15;
    this.calories = 0;
  };
};

class Mayonnaise extends Additionally{
  constructor(name){
    super('cheese');
    this.price = 20;
    this.calories = 5;
  };
};
