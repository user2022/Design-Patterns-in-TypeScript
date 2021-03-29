// All of my bespoke examples will be about a fan
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
console.log('----------FAN-----------');
// Using the decorator pattern with a fan, the fans will have a set price and weight that will be adjusted as new
// decorator features are added
// This abstract class will define the shape of a fan
var Fan = /** @class */ (function () {
    function Fan() {
    }
    // This method will return the description property value
    Fan.prototype.getDescription = function () {
        return this.description;
    };
    return Fan;
}());
// Fan versions
// Black fan // extends my Fan abstract class so it will need to include the properties so it is the same shape
var BlackFan = /** @class */ (function (_super) {
    __extends(BlackFan, _super);
    function BlackFan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Black Fan'; // Setting the base description that all black fans will have
        return _this;
    }
    BlackFan.prototype.cost = function () {
        return 35; // base cost
    };
    BlackFan.prototype.weight = function () {
        return 2; // base weight
    };
    return BlackFan;
}(Fan));
// White fan // also extends the abstract class Fan
var WhiteFan = /** @class */ (function (_super) {
    __extends(WhiteFan, _super);
    function WhiteFan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'White Fan';
        return _this;
    }
    WhiteFan.prototype.cost = function () {
        return 40;
    };
    WhiteFan.prototype.weight = function () {
        return 2;
    };
    return WhiteFan;
}(Fan));
// This abstract class will extend my original Fan abstract class and will include the decorator features
var FanOptions = /** @class */ (function (_super) {
    __extends(FanOptions, _super);
    function FanOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FanOptions;
}(Fan));
// This class is a decorator feature for my fans // extends the FanOptions abstract class
var FanStand = /** @class */ (function (_super) {
    __extends(FanStand, _super);
    // constructor will be used to set my decoratedFan property to an instance of a fan
    function FanStand(fan) {
        var _this = _super.call(this) || this;
        _this.decoratedFan = fan; // an instance of a fan will need to be passed through upon creating a decorator instance
        return _this;
    }
    // Gets the current description and adds the new feature onto it
    FanStand.prototype.getDescription = function () {
        return this.decoratedFan.getDescription() + ' + fan stand';
    };
    // Adds the cost of this decorator feature onto the existing cost
    FanStand.prototype.cost = function () {
        return this.decoratedFan.cost() + 20;
    };
    // Adds the weight of this decorator feature onto the existing weight
    FanStand.prototype.weight = function () {
        return this.decoratedFan.weight() + 1;
    };
    return FanStand;
}(FanOptions));
var ImprovedBlades = /** @class */ (function (_super) {
    __extends(ImprovedBlades, _super);
    function ImprovedBlades(fan) {
        var _this = _super.call(this) || this;
        _this.decoratedFan = fan;
        return _this;
    }
    ImprovedBlades.prototype.getDescription = function () {
        return this.decoratedFan.getDescription() + ' + improved blades';
    };
    ImprovedBlades.prototype.cost = function () {
        return this.decoratedFan.cost() + 15;
    };
    // Improved blades decorator won't change the weight of the fan so nothing changes
    ImprovedBlades.prototype.weight = function () {
        return this.decoratedFan.weight();
    };
    return ImprovedBlades;
}(FanOptions));
var LongerCable = /** @class */ (function (_super) {
    __extends(LongerCable, _super);
    function LongerCable(fan) {
        var _this = _super.call(this) || this;
        _this.decoratedFan = fan;
        return _this;
    }
    LongerCable.prototype.getDescription = function () {
        return this.decoratedFan.getDescription() + ' + longer cable';
    };
    LongerCable.prototype.cost = function () {
        return this.decoratedFan.cost() + 10;
    };
    LongerCable.prototype.weight = function () {
        return this.decoratedFan.weight() + 1;
    };
    return LongerCable;
}(FanOptions));
// Executing the code
var myFan = new BlackFan(); // Creating an instance of a black fan
myFan = new LongerCable(myFan); // Adding the longer cable feature to my fan
console.log('price: ' + myFan.cost()); // The cost has now increased from what the base cost was
console.log('description: ' + myFan.getDescription()); // Description has been changed to show a longer cable is added
console.log('weight: ' + myFan.weight()); // Weight has changed now that it has a longer cable
var whiteFan = new WhiteFan(); // Creating an instance of a white fan
whiteFan = new ImprovedBlades(whiteFan); // Adding the improved blades decorator
whiteFan = new FanStand(whiteFan); // Adding the fan stand decorator
// I have added 2 decorator features onto a single fan and it will update the properties accordingly
console.log('---');
console.log('price: ' + whiteFan.cost()); // Shows the price includes both decorator features + the original price
console.log('weight: ' + whiteFan.weight()); // shows the weight includes both decorators weight + the original weight
console.log('description: ' + whiteFan.getDescription()); // Shows it has both decorator features
