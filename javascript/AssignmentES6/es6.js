// const printName = (name) => {
//                      return "Hi" + name;
//            }   Task 1: convert this function to one-liner

//Task 1

const printName = (name) => "Hi "+name;

console.log(printName("ChandraKaran"));

//Task 2

// Rewrite the following code using template literals
// const printBill = (name, bill) => {
//                      return “Hi “ + name + “, please pay: “ + bill;
//            }

const printBill = (name,bill)=> `Hi ${name}, please pay: ${bill}`;
console.log(printBill("Chandra",1000));

//Task 3

// Modify the following code such that the object properties are destructured and logged.
// const person = {
//                       name: “Noam Chomsky”,
//                       age: 92
//             }
           
//            let name = person.name;
//            let age = person.age;
//            console.log(name);
//            console.log(age);

const person = {
    name: "Noam Chomsky",
    age:92
}

const {name,age} = person;

console.log(name);
console.log(age);