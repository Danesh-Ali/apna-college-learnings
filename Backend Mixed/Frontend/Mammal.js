class Mammal{
    constructor(name){
        this.name = name
        this.type = "Warm-Blooded"
    }

    eat(){
        console.log("i am eating")
    }
}

class Dog extends Mammal{
    constructor(name){
        super(name)
    }

    bark(){
        console.log("woof...")
    }
}
class Cat extends Mammal{
    constructor(name){
        super(name)
    }

    meow(){
        console.log("meow...")
    }
}

let dog = new Dog('Dogiee')
let cat = new Cat('Catiee')