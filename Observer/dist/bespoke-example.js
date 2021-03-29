console.log('-----------------------');
// This temperature class is my subject and it will be observed by observers for changes
var Temperature = /** @class */ (function () {
    function Temperature() {
        this.observers = [];
    }
    // This method will be used to change the temperature
    Temperature.prototype.setTemperature = function (temp) {
        // Each time the temperature is changed, log what the new value is
        console.log('New temperature measurement is: ' + temp);
        this.temperature = temp; // Setting the new temperature to the temperature property value
        this.notifyObserver(); // Notify the observers a change has been made
    };
    Temperature.prototype.notifyObserver = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) { // Loop through every observer
            var observer = _a[_i];
            observer.update(this.temperature); // Calling the update method on every observer with the new temperature value
        }
    };
    Temperature.prototype.registerObserver = function (o) {
        this.observers.push(o); // Adding a new object to the observers array that wants to observe the temperature
    };
    Temperature.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    };
    return Temperature;
}());
// This is my observer class
var Fan = /** @class */ (function () {
    // upon an object being created through this class it will need to be passed an instance of the temperature as a parameter
    function Fan(temperature) {
        this.subject = temperature; // Setting my subject property to an instance of the temperature class
        temperature.registerObserver(this); // registering this object as an observer
    }
    // When the temperature has changed, this method will execute
    Fan.prototype.update = function (temperature) {
        // Checking what the current value is and logging something different depending on what it is
        if (temperature > 15 && temperature < 20) {
            console.log('Fan: Using slow speed');
        }
        else if (temperature >= 20 && temperature < 30) {
            console.log('Fan: Using medium speed');
        }
        else if (temperature >= 30) {
            console.log('Fan: Using very fast speed');
        }
        else {
            console.log('Fan: Temperature not high enough. Fan is turned off.');
        }
    };
    return Fan;
}());
// Creating an instance of temperature
var temperature = new Temperature();
var fan = new Fan(temperature); // Adding a fan instance to observe the temperature object
// Changing the value of the temperature and the fan will update with a message
temperature.setTemperature(32);
temperature.setTemperature(25);
temperature.setTemperature(17);
temperature.setTemperature(5);
