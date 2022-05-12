function Dog(name, age) {
  this.name = name;
  this.age = age;
}

class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function runTests() {
  console.log("Tests");

  //object literal
  let dog = { name: "Fido", age: 3 };
  console.log(dog);

  //object constructor
  let dog1 = new Dog("Buddy", 9);
  console.log(dog1);

  //class
  let cat1 = new Cat("Bandit", 5);
  console.log(cat1);
}

runTests();
