// factory function wihch is fail

function PersonMaker(name, age) {  // disadvantage it create cpoy of all new objects
    const person = {
        name: name,
        age: age,
        talk() {
            console.log(`My name is: ${name}`)
        }
    }

    return person
}

// constructor  that does'nt return any result & start with capital letter standard

// this is template 
function Person1(name, age){
    this.name = name,
    this.age = age
    console.log(this) // iska mat lab all object value ko print krdo
}

Person1.prototype.talk = function(){
    console.log(`My name is: ${this.name}`)
}

let p1 = new Person1("danish", 23)
let p2 = new Person1("babar", 35)

// **************************************************************************

// 3rd and best recommended but you can also sue for other method for consturctor is class

class Person{
    constructor(name, age){
        this.name = name,
        this.age = age
    }

    talk(){
        console.log(`My name is: ${this.name}`)
    }
}

// let p3 = new Person("danish", 23)
// let p4 = new Person("babar", 35)

// *******************************************************8

// Parent Class

class Persons{
    constructor(name, age){
        this.name = name,
        this.age = age
    }

    talk(){
        console.log(`My name is: ${this.name}`)
    }
}

class Student extends Persons{
    constructor(name , age, marks){
        super(name, age)
        this.marks = marks
    }
}

class Teacher extends Persons{
    constructor(name , age, subject){
        super(name, age)
        this.subject = subject
    }
}

let std = new Student("danish", 23, 100)
let tch = new Teacher("babar", 35, "ENglish")
 