console.log('---------------------');
var Fan = /** @class */ (function () {
    function Fan() {
        // upon a new instance of this class being made each state will be assigned an instance of this fan object
        this.turnedOffState = new TurnedOffState(this);
        this.slowSpeedState = new SlowSpeedState(this);
        this.mediumSpeedState = new MediumSpeedState(this);
        this.highSpeedState = new HighSpeedState(this);
        // The default state will be turned off
        this.setState(this.turnedOffState);
    }
    // Allows me to set the state of my fan
    Fan.prototype.setState = function (state) {
        this.currentState = state;
    };
    // returns the current state the fan is in
    Fan.prototype.getState = function () {
        return this.currentState;
    };
    return Fan;
}());
// Classes for each state ---
// Turned off state is when the fan is turned off
var TurnedOffState = /** @class */ (function () {
    // Upon an object being created from this class it will pass in an instance of the fan class
    function TurnedOffState(fan) {
        this.fan = fan; // Setting my fan property to be = to a fan object
    }
    // Since it's in turned off state it can't be directly switched to high, it must go through off > slow > medium > high
    // or it can go back, but it can't skip a step
    TurnedOffState.prototype.highSpeed = function () {
        console.log('The fan must be in medium speed before it can go to high speed');
    };
    TurnedOffState.prototype.slowSpeed = function () {
        console.log('Fan: The fan is now turned on in slow speed');
        this.fan.setState(this.fan.slowSpeedState); // As it is possible for the fan to be switched to
        // slow speed state I have changed the state to slowSpeedState
    };
    TurnedOffState.prototype.mediumSpeed = function () {
        console.log('The fan must be in slow speed mode before it can go to medium');
    };
    TurnedOffState.prototype.turnedOff = function () {
        console.log('The fan is already turned off');
    };
    return TurnedOffState;
}());
// Slow speed state
var SlowSpeedState = /** @class */ (function () {
    function SlowSpeedState(fan) {
        this.fan = fan;
    }
    SlowSpeedState.prototype.highSpeed = function () {
        console.log('The fan must be in medium speed before it can go to high');
    };
    SlowSpeedState.prototype.slowSpeed = function () {
        console.log('The fan is already in slow speed mode!');
    };
    // If the fan is in slow speed mode it will be able to go up one step to medium speed or down to being turned off
    SlowSpeedState.prototype.mediumSpeed = function () {
        console.log('Fan: Switches to medium speed mode');
        this.fan.setState(this.fan.mediumSpeedState); // Setting the fan speed to medium
    };
    SlowSpeedState.prototype.turnedOff = function () {
        console.log('Fan: Turned off');
        this.fan.setState(this.fan.turnedOffState); // Setting the fan speed to off
    };
    return SlowSpeedState;
}());
// medium speed state
var MediumSpeedState = /** @class */ (function () {
    function MediumSpeedState(fan) {
        this.fan = fan;
    }
    MediumSpeedState.prototype.highSpeed = function () {
        console.log('Fan: Switches to high speed mode');
        this.fan.setState(this.fan.highSpeedState);
    };
    MediumSpeedState.prototype.slowSpeed = function () {
        console.log('Fan: Switches to slow speed mode');
        this.fan.setState(this.fan.slowSpeedState);
    };
    MediumSpeedState.prototype.mediumSpeed = function () {
        console.log('The fan is already at medium speed mode');
    };
    MediumSpeedState.prototype.turnedOff = function () {
        console.log('The fan needs to be in slow speed before it can be turned off');
    };
    return MediumSpeedState;
}());
// high speed state
var HighSpeedState = /** @class */ (function () {
    function HighSpeedState(fan) {
        this.fan = fan;
    }
    HighSpeedState.prototype.highSpeed = function () {
        console.log('The fan is already in high speed mode');
    };
    HighSpeedState.prototype.slowSpeed = function () {
        console.log('The fan needs to be in medium speed before it can go down to slow speed');
    };
    HighSpeedState.prototype.mediumSpeed = function () {
        console.log('Fan: Switches to medium speed');
        this.fan.setState(this.fan.mediumSpeedState);
    };
    HighSpeedState.prototype.turnedOff = function () {
        console.log('The fan needs to be in slow speed before it can be turned off!');
    };
    return HighSpeedState;
}());
// Executing the code
var fan = new Fan(); // Creating a fan instance
fan.getState().slowSpeed(); // Setting the state to slow speed, this will work as it's currently turned off
fan.getState().highSpeed(); // Trying to set to speed to high, this won't work as it needs to be in medium before going to high
fan.getState().mediumSpeed(); // Setting speed to medium, works as it's currently in slow
fan.getState().highSpeed(); // Now setting the speed to high will work as it is in medium
console.log('Fan state: ' + fan.getState().constructor.name); // returns the current state of the fan
