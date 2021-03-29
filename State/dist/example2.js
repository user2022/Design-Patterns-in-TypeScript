console.log('----------------');
var Radiator = /** @class */ (function () {
    function Radiator() {
        // upon a new instance of this class being made each state will be assigned a new instance of the state it belongs to
        // so turnedOffState property will = to a new turnedOffState instance and the parameter is this radiator object
        this.turnedOffState = new TurnedOffState(this);
        this.lowHeatingState = new LowHeatingState(this);
        this.mediumHeatingState = new MediumHeatingState(this);
        this.highHeatingState = new HighHeatingState(this);
        // The default state will be turned off
        this.setState(this.turnedOffState);
    }
    // Allows me to set the state of my radiator
    Radiator.prototype.setState = function (state) {
        this.currentState = state;
    };
    // returns the current state the radiator is in
    Radiator.prototype.getState = function () {
        return this.currentState;
    };
    return Radiator;
}());
// Classes for each state ---
// Turned off state is when the radiator valve is on OFF
var TurnedOffState = /** @class */ (function () {
    // upon creation the radiator property will be assigned a radiator instance passed through as a parameter
    function TurnedOffState(rad) {
        this.radiator = rad;
    }
    // Since it's in turned off state it can't be directly switched to high, it must go through off > low > medium > high
    // or it can go back, but it can't skip a step
    TurnedOffState.prototype.highHeating = function () {
        console.log('The radiator must be in medium heating before it can move to high!');
    };
    TurnedOffState.prototype.lowHeating = function () {
        console.log('Radiator: Turns on and switches to lower heating power');
        this.radiator.setState(this.radiator.lowHeatingState); // As it is possible for the radiator to be switched to
        // lower heating state I have changed the state to lowHeatingState
    };
    TurnedOffState.prototype.mediumHeating = function () {
        console.log('The radiator must be in low heating before it can move to medium!');
    };
    TurnedOffState.prototype.turnedOff = function () {
        console.log('Radiator is already turned off');
    };
    return TurnedOffState;
}());
// Low heating state is when the radiator valve is turned to LOW
var LowHeatingState = /** @class */ (function () {
    function LowHeatingState(rad) {
        this.radiator = rad;
    }
    LowHeatingState.prototype.highHeating = function () {
        console.log('The radiator must be in medium heating before it can move to high!');
    };
    LowHeatingState.prototype.lowHeating = function () {
        console.log('The radiator is already in low heating mode!');
    };
    // If the radiator is in low heating mode it will be able to go up one step to mediumHeating or down to turnedOff mode
    LowHeatingState.prototype.mediumHeating = function () {
        console.log('Radiator: Switches to medium heating power');
        this.radiator.setState(this.radiator.mediumHeatingState); // Setting the radiator to medium heating state
    };
    LowHeatingState.prototype.turnedOff = function () {
        console.log('Radiator: Switches off');
        this.radiator.setState(this.radiator.turnedOffState); // Setting the radiator state to turned off
    };
    return LowHeatingState;
}());
// medium heating state is when the radiator valve is turned to MEDIUM
var MediumHeatingState = /** @class */ (function () {
    function MediumHeatingState(rad) {
        this.radiator = rad;
    }
    MediumHeatingState.prototype.highHeating = function () {
        console.log('Radiator: Switches to high heating power');
        this.radiator.setState(this.radiator.highHeatingState);
    };
    MediumHeatingState.prototype.lowHeating = function () {
        console.log('Radiator: Switches to low heating power');
        this.radiator.setState(this.radiator.lowHeatingState);
    };
    MediumHeatingState.prototype.mediumHeating = function () {
        console.log('The radiator is already in medium heating mode!');
    };
    MediumHeatingState.prototype.turnedOff = function () {
        console.log('The radiator needs to be in low heating before it can be turned off!');
    };
    return MediumHeatingState;
}());
// high heating state is when the radiator valve is turned to HIGH
var HighHeatingState = /** @class */ (function () {
    function HighHeatingState(rad) {
        this.radiator = rad;
    }
    HighHeatingState.prototype.highHeating = function () {
        console.log('The radiator is already in high heating mode!');
    };
    HighHeatingState.prototype.lowHeating = function () {
        console.log('The radiator needs to be in medium heating mode before it can be turned down to low heating');
    };
    HighHeatingState.prototype.mediumHeating = function () {
        console.log('Radiator: Switches to medium heating power');
        this.radiator.setState(this.radiator.mediumHeatingState);
    };
    HighHeatingState.prototype.turnedOff = function () {
        console.log('The radiator needs to be in low heating before it can be turned off!');
    };
    return HighHeatingState;
}());
// Executing the above code
var radiator = new Radiator(); // Creating a new radiator
radiator.getState().lowHeating(); // Switches to low heating which is the correct step and will work
radiator.getState().highHeating(); // This will NOT work as the lower heating state can only be switched to the medium or off state
radiator.getState().mediumHeating(); // This will work as it is possible to move from lower state to medium
console.log('Radiator state: ' + radiator.getState().constructor.name); // tells the current state of the radiator
