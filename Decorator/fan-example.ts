// All of my bespoke examples will be about a fan

console.log('----------FAN-----------')

// Using the decorator pattern with a fan, the fans will have a set price and weight that will be adjusted as new
// decorator features are added

// This abstract class will define the shape of a fan
abstract class Fan {
    public description: string; // This description property will be used to list the extra decorator features it has

    // This method will return the description property value
    public getDescription(): string {
        return this.description;
    }

    // abstract methods, body can only be implemented inside my fan classes that extend this
    public abstract cost(): number; // price of the fan, will increase if decorators are added
    public abstract weight(): number; // weight of fan, will change depending on the decorators added
}

// Fan versions
// Black fan // extends my Fan abstract class so it will need to include the properties so it is the same shape
class BlackFan extends Fan {
    public description = 'Black Fan'; // Setting the base description that all black fans will have

    cost(): number {
        return 35; // base cost
    }

    weight(): number {
        return 2; // base weight
    }
}

// White fan // also extends the abstract class Fan
class WhiteFan extends Fan {
    public description = 'White Fan';

    cost(): number {
        return 40;
    }

    weight(): number {
        return 2;
    }
}

// This abstract class will extend my original Fan abstract class and will include the decorator features
abstract class FanOptions extends Fan {
    decoratedFan: Fan; // Every fan decorator will need an instance of either a black or white fan passed to it

    // Every fan decorator will need to use these methods so that it can define the properties of what each decorator has
    public abstract getDescription(): string;
    public abstract cost(): number;
    public abstract weight(): number;
}

// This class is a decorator feature for my fans // extends the FanOptions abstract class
class FanStand extends FanOptions {
    decoratedFan: Fan;

    // constructor will be used to set my decoratedFan property to an instance of a fan
    constructor(fan: Fan) {
        super();
        this.decoratedFan = fan; // an instance of a fan will need to be passed through upon creating a decorator instance
    }

    // Gets the current description and adds the new feature onto it
    getDescription(): string {
        return this.decoratedFan.getDescription() + ' + fan stand';
    }

    // Adds the cost of this decorator feature onto the existing cost
    cost(): number {
        return this.decoratedFan.cost() + 20;
    }

    // Adds the weight of this decorator feature onto the existing weight
    weight(): number {
        return this.decoratedFan.weight() + 1;
    }
}

class ImprovedBlades extends FanOptions {
    decoratedFan: Fan;

    constructor(fan: Fan) {
        super();
        this.decoratedFan = fan;
    }

    getDescription(): string {
        return this.decoratedFan.getDescription() + ' + improved blades';
    }

    cost(): number {
        return this.decoratedFan.cost() + 15;
    }

    // Improved blades decorator won't change the weight of the fan so nothing changes
    weight(): number {
        return this.decoratedFan.weight();
    }
}

class LongerCable extends FanOptions {
    decoratedFan: Fan;

    constructor(fan: Fan) {
        super();
        this.decoratedFan = fan;
    }

    getDescription(): string {
        return this.decoratedFan.getDescription() + ' + longer cable';
    }

    cost(): number {
        return this.decoratedFan.cost() + 10;
    }

    weight(): number {
        return this.decoratedFan.weight() + 1;
    }
}

// Executing the code
let myFan = new BlackFan(); // Creating an instance of a black fan
myFan = new LongerCable(myFan); // Adding the longer cable feature to my fan

console.log('price: ' + myFan.cost()); // The cost has now increased from what the base cost was
console.log('description: ' + myFan.getDescription()); // Description has been changed to show a longer cable is added
console.log('weight: ' + myFan.weight()); // Weight has changed now that it has a longer cable

let whiteFan = new WhiteFan(); // Creating an instance of a white fan
whiteFan = new ImprovedBlades(whiteFan); // Adding the improved blades decorator
whiteFan = new FanStand(whiteFan); // Adding the fan stand decorator

// I have added 2 decorator features onto a single fan and it will update the properties accordingly

console.log('---');
console.log('price: ' + whiteFan.cost()); // Shows the price includes both decorator features + the original price
console.log('weight: ' + whiteFan.weight()); // shows the weight includes both decorators weight + the original weight
console.log('description: ' + whiteFan.getDescription()); // Shows it has both decorator features
