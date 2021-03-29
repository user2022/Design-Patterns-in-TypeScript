abstract class Car { // This is the blueprint that my types of cars will need to include
    public description: string;

    public getDescription(): string {
        return this.description;
    }

    public abstract cost(): number;
}

// Type of car
class ModelS extends Car {
    public description = 'Model S'; // Car models description

    public cost(): number {
        return 73000; // Cost of this car model
    }
}

// Type of car
class ModelX extends Car {
    public description = 'Model X'; // Car models description

    public cost(): number {
        return 77000 // Cost of this car model
    }
}

// An abstract class that will be a blueprint for my car features/options
abstract class CarOptions extends Car {
    decoratedCar: Car;

    public abstract getDescription(): string;
    public abstract cost(): number;
}

// A class for a decorator feature that can be added to the car
class EnhancedAutoPilot extends CarOptions {
    decoratedCar: Car;

    // Setting the value of decorated car to an instance of the car
    constructor(car: Car) {
        super();
        this.decoratedCar = car;
    }


    getDescription(): string {
        return this.decoratedCar.getDescription() + ', Enhanced auto pilot'; // Modify the description to include the enhanced auto pilot
    }

    cost(): number {
        return this.decoratedCar.cost() + 5000; // Increase the price of the car now that it has a new feature
    }
}

class RearFacingSeats extends CarOptions {
    decoratedCar: Car;

    constructor(car: Car) { // Give this feature an instance of the Car class
        super();
        this.decoratedCar = car;
    }


    getDescription(): string {
        return this.decoratedCar.getDescription() + ', Rear facing seats'; // Modify the description to include the rear facing seats feature
    }

    cost(): number {
        return this.decoratedCar.cost() + 3500; // Increase the price of the car now that it has a new feature
    }
}

// Executing the code

let myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla); // Creating a ModelS tesla car with the rear facing seats feature
myTesla = new EnhancedAutoPilot(myTesla); 

console.log(myTesla.cost());
console.log(myTesla.getDescription());
