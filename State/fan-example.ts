console.log('---------------------');

// Using the state pattern with a fan. The fan will have 4 different states: turned off, slow speed, medium speed, high speed
// The fan can only go from off to slow, slow to medium, medium to high, and high to medium, medium to slow, slow to off
// The fan cannot skip from off to high speed for example, it has to go through the cycle

interface State {
    fan: Fan; // instance of a fan

    turnedOff(); // turn off method
    slowSpeed(); // low speed method
    mediumSpeed(); // medium speed method
    highSpeed(); // high speed method
}

class Fan {
    // Setting a property for each state in my fan class so that it knows what state its in
    public turnedOffState: State;
    public slowSpeedState: State;
    public mediumSpeedState: State;
    public highSpeedState: State;

    public currentState: State;

    constructor() {
        // upon a new instance of this class being made each state will be assigned an instance of this fan object
        this.turnedOffState = new  TurnedOffState(this);
        this.slowSpeedState = new SlowSpeedState(this);
        this.mediumSpeedState = new MediumSpeedState(this);
        this.highSpeedState = new HighSpeedState(this);

        // The default state will be turned off
        this.setState(this.turnedOffState);
    }

    // Allows me to set the state of my fan
    public setState(state: State) {
        this.currentState = state;
    }

    // returns the current state the fan is in
    public getState(): State {
        return this.currentState;
    }
}

// Classes for each state ---

// Turned off state is when the fan is turned off
class TurnedOffState implements State {
    fan: Fan; // Creating a fan property that will have the same shape as my fan class

    // Upon an object being created from this class it will pass in an instance of the fan class
    constructor(fan: Fan) {
        this.fan = fan; // Setting my fan property to be = to a fan object
    }

    // Since it's in turned off state it can't be directly switched to high, it must go through off > slow > medium > high
    // or it can go back, but it can't skip a step
    highSpeed() {
        console.log('The fan must be in medium speed before it can go to high speed');
    }

    slowSpeed() {
        console.log('Fan: The fan is now turned on in slow speed');
        this.fan.setState(this.fan.slowSpeedState); // As it is possible for the fan to be switched to
        // slow speed state I have changed the state to slowSpeedState
    }

    mediumSpeed() {
        console.log('The fan must be in slow speed mode before it can go to medium');
    }

    turnedOff() {
        console.log('The fan is already turned off');
    }

}

// Slow speed state
class SlowSpeedState implements State {
    fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    highSpeed() {
        console.log('The fan must be in medium speed before it can go to high');
    }

    slowSpeed() {
        console.log('The fan is already in slow speed mode!');
    }

    // If the fan is in slow speed mode it will be able to go up one step to medium speed or down to being turned off
    mediumSpeed() {
        console.log('Fan: Switches to medium speed mode');
        this.fan.setState(this.fan.mediumSpeedState); // Setting the fan speed to medium
    }

    turnedOff() {
        console.log('Fan: Turned off');
        this.fan.setState(this.fan.turnedOffState); // Setting the fan speed to off
    }

}

// medium speed state
class MediumSpeedState implements State {
    fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    highSpeed() {
        console.log('Fan: Switches to high speed mode');
        this.fan.setState(this.fan.highSpeedState);
    }

    slowSpeed() {
        console.log('Fan: Switches to slow speed mode');
        this.fan.setState(this.fan.slowSpeedState);
    }

    mediumSpeed() {
        console.log('The fan is already at medium speed mode');
    }

    turnedOff() {
        console.log('The fan needs to be in slow speed before it can be turned off');
    }

}

// high speed state
class HighSpeedState implements State {
    fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    highSpeed() {
        console.log('The fan is already in high speed mode');
    }

    slowSpeed() {
        console.log('The fan needs to be in medium speed before it can go down to slow speed');
    }

    mediumSpeed() {
        console.log('Fan: Switches to medium speed');
        this.fan.setState(this.fan.mediumSpeedState);
    }

    turnedOff() {
        console.log('The fan needs to be in slow speed before it can be turned off!');
    }
}

// Executing the code
let fan = new Fan(); // Creating a fan instance

fan.getState().slowSpeed(); // Setting the state to slow speed, this will work as it's currently turned off
fan.getState().highSpeed(); // Trying to set to speed to high, this won't work as it needs to be in medium before going to high
fan.getState().mediumSpeed(); // Setting speed to medium, works as it's currently in slow
fan.getState().highSpeed(); // Now setting the speed to high will work as it is in medium

console.log('Fan state: ' + (<any> fan.getState()).constructor.name); // returns the current state of the fan
