function greet(){
  return "Hello everyone";
}

function sayHi(){
   return greet();
}

var greeting = sayHi();
console.log(greeting);