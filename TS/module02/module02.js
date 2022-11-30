"use strict";
/* Module 2: Declare variable types in TypeScript
   Lab start  */
/*  EXERCISE 1
    TODO: Modify the code to add types to the variable declarations.
    The resulting JavaScript should look the same as the original example when you're done. */
let firstName;
let lastName;
let fullName;
let age;
let ukCitizen;
firstName = 'Rebecca';
lastName = 'Smith';
age = 42;
ukCitizen = false;
fullName = firstName + " " + lastName;
if (ukCitizen) {
    console.log("My name is " + fullName + ", I'm " + age + ", and I'm a citizen of the United Kingdom.");
}
else {
    console.log("My name is " + fullName + ", I'm " + age + ", and I'm not a citizen of the United Kingdom.");
}
/* EXERCISE 2
   TODO: You can use types to ensure operation outcomes. Run the code as is and then modify
   it to have strongly typed variables. Then, address any errors you find so that the result
   returned to a is 12. */
let x;
let y;
let a;
x = 'five';
y = 7;
a = x + y;
console.log(a);
