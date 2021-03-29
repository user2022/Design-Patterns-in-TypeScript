var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.getDescription = function () {
        return this.description;
    };
    return Car;
}());
// Type of car
var ModelS = /** @class */ (function (_super) {
    __extends(ModelS, _super);
    function ModelS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Model S'; // Car models description
        return _this;
    }
    ModelS.prototype.cost = function () {
        return 73000; // Cost of this car model
    };
    return ModelS;
}(Car));
// Type of car
var ModelX = /** @class */ (function (_super) {
    __extends(ModelX, _super);
    function ModelX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Model X'; // Car models description
        return _this;
    }
    ModelX.prototype.cost = function () {
        return 77000; // Cost of this car model
    };
    return ModelX;
}(Car));
// An abstract class that will be a blueprint for my car features/options
var CarOptions = /** @class */ (function (_super) {
    __extends(CarOptions, _super);
    function CarOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CarOptions;
}(Car));
// A class for a decorator feature that can be added to the car
var EnhancedAutoPilot = /** @class */ (function (_super) {
    __extends(EnhancedAutoPilot, _super);
    // Setting the value of decorated car to an instance of the car
    function EnhancedAutoPilot(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    EnhancedAutoPilot.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Enhanced auto pilot'; // Modify the description to include the enhanced auto pilot
    };
    EnhancedAutoPilot.prototype.cost = function () {
        return this.decoratedCar.cost() + 5000; // Increase the price of the car now that it has a new feature
    };
    return EnhancedAutoPilot;
}(CarOptions));
var RearFacingSeats = /** @class */ (function (_super) {
    __extends(RearFacingSeats, _super);
    function RearFacingSeats(car) {
        var _this = _super.call(this) || this;
        _this.decoratedCar = car;
        return _this;
    }
    RearFacingSeats.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + ', Rear facing seats'; // Modify the description to include the rear facing seats feature
    };
    RearFacingSeats.prototype.cost = function () {
        return this.decoratedCar.cost() + 3500; // Increase the price of the car now that it has a new feature
    };
    return RearFacingSeats;
}(CarOptions));
// Executing the code
var myTesla = new ModelS();
myTesla = new RearFacingSeats(myTesla); // Creating a ModelS tesla car with the rear facing seats feature
myTesla = new EnhancedAutoPilot(myTesla);
console.log(myTesla.cost());
console.log(myTesla.getDescription());
