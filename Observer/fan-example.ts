console.log('-----------------------');

// Observer pattern used with a fan. The fan will observe a temperature and if the temperature is high enough the fan
// will automatically turn on

interface Subject {
    registerObserver(o: Observer); // Allows a fan to register itself as an observer with the temperature
    removeObserver(o: Observer); // Stop being notified of changes in the temperature
    notifyObserver(); // If change happens, notify all observers
}

// Interface that my observers will implement
// Every observer class will need to have an update method which will have the logic for what to do
// once the temperature changes
interface Observer {
    update(temperature: number);
}

// This temperature class is my subject and it will be observed by observers for changes
class Temperature implements Subject {
    private temperature: number;
    private observers: Observer[] = [];

    // This method will be used to change the temperature
    setTemperature(temp: number) {
        // Each time the temperature is changed, log what the new value is
        console.log('New temperature measurement is: ' + temp);
        this.temperature = temp; // Setting the new temperature to the temperature property value
        this.notifyObserver(); // Notify the observers a change has been made
    }

    notifyObserver() {
        for (let observer of this.observers) { // Loop through every observer
            observer.update(this.temperature); // Calling the update method on every observer with the new temperature value
        }
    }

    registerObserver(o: Observer) {
        this.observers.push(o); // Adding a new object to the observers array that wants to observe the temperature
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    }
}

// This is my observer class
class Fan implements Observer {
    private subject: Subject;
    // upon an object being created through this class it will need to be passed an instance of the temperature as a parameter
    constructor(temperature: Subject) {
        this.subject = temperature; // Setting my subject property to an instance of the temperature class
        temperature.registerObserver(this); // registering this object as an observer
    }

    // When the temperature has changed, this method will execute
    update(temperature: number) {
        // Checking what the current value is and logging something different depending on what it is
        if (temperature > 15 && temperature < 20) {
            console.log('Fan: Using slow speed');
        } else if (temperature >= 20 && temperature < 30) {
            console.log('Fan: Using medium speed');
        } else if (temperature >= 30) {
            console.log('Fan: Using very fast speed')
        } else {
            console.log('Fan: Temperature not high enough. Fan is turned off.');
        }
    }
}

// Creating an instance of temperature
let temperature = new Temperature();

let fan = new Fan(temperature); // Adding a fan instance to observe the temperature object

// Changing the value of the temperature and the fan will update with a message
temperature.setTemperature(32);
temperature.setTemperature(25);
temperature.setTemperature(17);
temperature.setTemperature(5);
