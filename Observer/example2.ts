console.log('----------------------');

interface Subject {
    registerObserver(o: Observer); // Allows a gadget that uses internet to register itself as an observer with the router
    removeObserver(o: Observer); // Stop being notified of changes in router status
    notifyObserver(); // If change happens, notify all observers
}

// all observers such as a computer, iPad etc. will implement this and it will pass in the turnedOn status of the router
// Then logic will happen if it's turned on or off
interface Observer {
    update(on: boolean);
}

class Router implements Subject {
    private turnedOn: boolean;
    private observers: Observer[] = []; // Array of observer objects

    setTurnedOn(on: boolean) {
        if (on === true) {
            console.log('Router is on');
        } else {
            console.log('Router is not on');
        }

        this.turnedOn = on;
        this.notifyObserver();
    }

    // Notifies everything in the observers array that a change has been made
    notifyObserver() {
        for (let observer of this.observers) {
            observer.update(this.turnedOn) // call the update method on each observer and give it the turnedOn boolean value
        }
    }

    registerObserver(o: Observer) {
        this.observers.push(o); // Adding a new observer to the observers list
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    }
}

// Making the computer an observer
class Computer implements Observer {
    private subject: Subject;

    // The Computer will need a parameter which will be an instance of a Router class
    constructor(router: Subject) { // this.subject will be = to an instance of the Router class
        this.subject = router;
        router.registerObserver(this); // Register this object as an observer so this computer knows when changes happen to the turned on status
    }

    // When an update has been made to the turnedOn property, do this
    update(on: boolean) {
        if (on) { // If it's turned on the computer will have access to the internet
            console.log('Computer: I have access to the internet');
        } else { // if not it won't
            console.log('Computer: I do not have access to the internet');
        }
    }

}

// Creating an instance of the Router class
let router = new Router();

// Creating a computer instance and passing in the router instance I just made above
let computer = new Computer(router);

// Turning the router on
router.setTurnedOn(true);
console.log('--');

// Turning the router off
router.setTurnedOn(false);

