prototypal:
         ojb
        *   *
      *      *
proto         prop
{ }           obj.prop1
              obj.prop2
let person = {
  firstName: 'john',
  lastName : 'smith',
  getFullName: function(){
    return 'full name is:'+ this.firstName + this.lastName;
  }
};

// create new object
let john = Object.create(perosn);
 // object inheritance



let long = {
  firstName: 'Yunlong',
  lastName:'Liu'
};

long._prop_ = person;
console.log(long.getFullName());
// output: full name is: Yunlong Liu


/************************************************/
function Person(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
}


// getFullName() just the prototype of Person, not other's, can not be         
// copied when create object
Person.prototype.getFullName = function(){
  return this.firstName + this.lastName
}

// when object john is created, it will copy function Person
let john = new Person();
// john has prototype of getFullName(), but it did not copy from Person,
// it just can be used


// method chaining

obj{

  add: function(){
    return this;
  },
  remove: function(){
    return this;
  }
}

// both add and remove point to same obj
obj.add().remove();
