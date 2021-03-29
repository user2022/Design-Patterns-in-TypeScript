console.log('----------------------');

// Defining the shape of my TV model classes
abstract class TV {
    public description: string; // Each TV model will need a description that details what model it is and if it has any features

    public getDescription(): string { // Returns the description
        return this.description; // Will be used to modify onto the existing description
    }

    // Abstract means it needs to be included in classes that extend this
    public abstract cost(): number; // Used for returning and adding onto the cost
}

// A model of a TV
class LGTv extends TV {
    public description = 'LG TV'; // This is the basic description without any decorator features

    cost(): number {
        return 900; // Returning the current price without any decorator features
    }
}

// A model of a TV
class SamsungTv extends TV {
    public description = 'Samsung TV'; // This is the basic description without any decorator features

    cost(): number {
        return 1100; // Returning the current price without any decorator features
    }
}

// Abstract class that will extend the TV class and will include the decorator features
abstract class TvOptions extends TV {
    decoratedTv: TV; // Each class that extends this will need to include an instance of a TV object

    public abstract getDescription(): string; // Returns the description
    public abstract cost(): number; // Used for returning the cost
}

// Decorator feature for my TV models
class UltraHD extends TvOptions {
    decoratedTv: TV; // decoratorTv will be an instance of a TV class (LG or samsung models)

    constructor(tv: TV) { // Setting the decoratorTv method to be = to a tv instance. Will be passed through as a param
        super();
        this.decoratedTv = tv;
    }

    // Adding onto the existing description to include that it has this feature
    getDescription(): string {
        return this.decoratedTv.getDescription() + ', UltraHD quality';
    }

    // Increasing the current cost to include that it has this feature
    cost(): number {
        return this.decoratedTv.cost() + 300;
    }
}

// Surround sound feature
class SurroundSound extends TvOptions {
    decoratedTv: TV; // decoratorTv will be an instance of a TV class (LG or samsung models)

    constructor(tv: TV) { // Setting the decoratorTv method to be = to a tv instance. Will be passed through as a param
        super();
        this.decoratedTv = tv;
    }

    // Adding onto the existing description to include that it has this feature
    getDescription(): string {
        return this.decoratedTv.getDescription() + ', Surround sound speakers';
    }

    // Increasing the current cost to include that it has this feature
    cost(): number {
        return this.decoratedTv.cost() + 150;
    }
}

// Executing the code
let myTv = new LGTv(); // Creating an instance of an LG TV
myTv = new SurroundSound(myTv); // Adding the surround sound feature to my LG TV instance

console.log(myTv.cost()); // sending the price and description to the console with the new feature included, so price will be higher
console.log(myTv.getDescription());

