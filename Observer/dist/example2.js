console.log('----------------------');
var Router = /** @class */ (function () {
    function Router() {
        this.observers = []; // Array of observer objects
    }
    Router.prototype.setTurnedOn = function (on) {
        if (on === true) {
            console.log('Router is on');
        }
        else {
            console.log('Router is not on');
        }
        this.turnedOn = on;
        this.notifyObserver();
    };
    // Notifies everything in the observers array that a change has been made
    Router.prototype.notifyObserver = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.turnedOn); // call the update method on each observer and give it the turnedOn boolean value
        }
    };
    Router.prototype.registerObserver = function (o) {
        this.observers.push(o); // Adding a new observer to the observers list
    };
    Router.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o); // Find location in array
        this.observers.splice(index, 1); // Remove observer from the array
    };
    return Router;
}());
// Making the computer an observer
var Computer = /** @class */ (function () {
    // The Computer will need a parameter which will be an instance of a Router class
    function Computer(router) {
        this.subject = router;
        router.registerObserver(this); // Register this object as an observer so this computer knows when changes happen to the turned on status
    }
    // When an update has been made to the turnedOn property, do this
    Computer.prototype.update = function (on) {
        if (on) { // If it's turned on the computer will have access to the internet
            console.log('Computer: I have access to the internet');
        }
        else { // if not it won't
            console.log('Computer: I do not have access to the internet');
        }
    };
    return Computer;
}());
// Creating an instance of the Router class
var router = new Router();
// Creating a computer instance and passing in the router instance I just made above
var computer = new Computer(router);
// Turning the router on
router.setTurnedOn(true);
console.log('--');
// Turning the router off
router.setTurnedOn(false);
