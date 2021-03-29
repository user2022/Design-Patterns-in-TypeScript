console.log('----------------');

// This is the shape each of my states will take place as
// each state will contain a property reference of a radiator instance which will be initiated in a constructor
interface State {
    radiator: Radiator; // radiator instance

    turnedOff(); // turn off method
    lowHeating(); // low heating method
    mediumHeating(); // medium heating method
    highHeating(); // high heating method
}

class Radiator {
    // Setting a property for each state in my radiator class so that it knows what state its in
    public turnedOffState: State;
    public lowHeatingState: State;
    public mediumHeatingState: State;
    public highHeatingState: State;

    public currentState: State;

    constructor() {
        // upon a new instance of this class being made each state will be assigned a new instance of the state it belongs to
        // so turnedOffState property will = to a new turnedOffState instance and the parameter is this radiator object
        this.turnedOffState = new  TurnedOffState(this);
        this.lowHeatingState = new LowHeatingState(this);
        this.mediumHeatingState = new MediumHeatingState(this);
        this.highHeatingState = new HighHeatingState(this);

        // The default state will be turned off
        this.setState(this.turnedOffState);
    }

    // Allows me to set the state of my radiator
    public setState(state: State) {
        this.currentState = state;
    }

    // returns the current state the radiator is in
    public getState(): State {
        return this.currentState;
    }
}

// Classes for each state ---

// Turned off state is when the radiator valve is on OFF
class TurnedOffState implements State {
    radiator: Radiator; // Creating a radiator property that must have the same shape as my above class

    // upon creation the radiator property will be assigned a radiator instance passed through as a parameter
    constructor(rad: Radiator) {
        this.radiator = rad;
    }

    // Since it's in turned off state it can't be directly switched to high, it must go through off > low > medium > high
    // or it can go back, but it can't skip a step
    highHeating() {
        console.log('The radiator must be in medium heating before it can move to high!');
    }

    lowHeating() {
        console.log('Radiator: Turns on and switches to lower heating power');
        this.radiator.setState(this.radiator.lowHeatingState); // As it is possible for the radiator to be switched to
        // lower heating state I have changed the state to lowHeatingState
    }

    mediumHeating() {
        console.log('The radiator must be in low heating before it can move to medium!');
    }

    turnedOff() {
        console.log('Radiator is already turned off');
    }

}

// Low heating state is when the radiator valve is turned to LOW
class LowHeatingState implements State {
    radiator: Radiator;

    constructor(rad: Radiator) {
        this.radiator = rad;
    }

    highHeating() {
        console.log('The radiator must be in medium heating before it can move to high!');
    }

    lowHeating() {
        console.log('The radiator is already in low heating mode!');
    }

    // If the radiator is in low heating mode it will be able to go up one step to mediumHeating or down to turnedOff mode
    mediumHeating() {
        console.log('Radiator: Switches to medium heating power');
        this.radiator.setState(this.radiator.mediumHeatingState); // Setting the radiator to medium heating state
    }

    turnedOff() {
        console.log('Radiator: Switches off');
        this.radiator.setState(this.radiator.turnedOffState); // Setting the radiator state to turned off
    }

}

// medium heating state is when the radiator valve is turned to MEDIUM
class MediumHeatingState implements State {
    radiator: Radiator;

    constructor(rad: Radiator) {
        this.radiator = rad;
    }

    highHeating() {
        console.log('Radiator: Switches to high heating power');
        this.radiator.setState(this.radiator.highHeatingState);
    }

    lowHeating() {
        console.log('Radiator: Switches to low heating power');
        this.radiator.setState(this.radiator.lowHeatingState);
    }

    mediumHeating() {
        console.log('The radiator is already in medium heating mode!');
    }

    turnedOff() {
        console.log('The radiator needs to be in low heating before it can be turned off!');
    }

}

// high heating state is when the radiator valve is turned to HIGH
class HighHeatingState implements State {
    radiator: Radiator;

    constructor(rad: Radiator) {
        this.radiator = rad;
    }

    highHeating() {
        console.log('The radiator is already in high heating mode!');
    }

    lowHeating() {
        console.log('The radiator needs to be in medium heating mode before it can be turned down to low heating');
    }

    mediumHeating() {
        console.log('Radiator: Switches to medium heating power');
        this.radiator.setState(this.radiator.mediumHeatingState);
    }

    turnedOff() {
        console.log('The radiator needs to be in low heating before it can be turned off!');
    }
}

// Executing the above code
let radiator = new Radiator(); // Creating a new radiator

radiator.getState().lowHeating(); // Switches to low heating which is the correct step and will work
radiator.getState().highHeating(); // This will NOT work as the lower heating state can only be switched to the medium or off state
radiator.getState().mediumHeating(); // This will work as it is possible to move from lower state to medium

console.log('Radiator state: ' + (<any> radiator.getState()).constructor.name); // tells the current state of the radiator

