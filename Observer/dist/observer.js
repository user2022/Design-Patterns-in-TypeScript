var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = []; // Array of observer objects
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log('WeatherStation: New temperature measurement ' + temp);
        this.temperature = temp;
        this.notifyObserver();
    };
    WeatherStation.prototype.notifyObserver = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temperature); // call the update method on each observer and give it the temperature
        }
    };
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    };
    return WeatherStation;
}());
// Creating a temperature display that will observe the temperature
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this); // Register this object as an observer so this temperature display wants to know when changes happen to temperature
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log('TemperatureDisplay: I need to update my display');
        // Logic here
    };
    return TemperatureDisplay;
}());
// Creating a freezer that will observe the temperature
var Freezer = /** @class */ (function () {
    function Freezer(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this); // Register this object as an observer so this temperature display wants to know when changes happen to temperature
    }
    Freezer.prototype.update = function (temperature) {
        if (temperature > 0) {
            console.log('Please shut the freezer door');
            // Logic
        }
        else {
            console.log('Temperature is ok');
        }
    };
    return Freezer;
}());
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var freezer = new Freezer(weatherStation);
weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
