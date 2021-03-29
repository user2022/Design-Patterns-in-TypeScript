interface Subject {
    registerObserver(o: Observer); // Allows temperature display to register itself as an observer with the weather station
    removeObserver(o: Observer); // Stop being notified of changes in temperature
    notifyObserver(); // If change happens, notify all observers
}

interface Observer {
    update(temperature: number);
}

class WeatherStation implements Subject {
    private temperature: number;
    private observers: Observer[] = []; // Array of observer objects

    setTemperature(temp: number) {
        console.log('WeatherStation: New temperature measurement ' + temp);
        this.temperature = temp;
        this.notifyObserver();
    }

    notifyObserver() {
        for (let observer of this.observers) {
            observer.update(this.temperature) // call the update method on each observer and give it the temperature
        }
    }

    registerObserver(o: Observer) {
        this.observers.push(o);
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    }
}

// Creating a temperature display that will observe the temperature
class TemperatureDisplay implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this); // Register this object as an observer so this temperature display wants to know when changes happen to temperature
    }


    update(temperature: number) {
        console.log('TemperatureDisplay: I need to update my display');
        // Logic here
    }
}

// Creating a freezer that will observe the temperature
class Freezer implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this); // Register this object as an observer so this temperature display wants to know when changes happen to temperature
    }


    update(temperature: number) {
        if (temperature > 0) {
            console.log('Please shut the freezer door');
            // Logic
        } else {
            console.log('Temperature is ok');
        }
    }
}

let weatherStation = new WeatherStation();

let tempDisplay = new TemperatureDisplay(weatherStation);
let freezer = new Freezer(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
