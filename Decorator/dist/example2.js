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
console.log('----------------------');
// Defining the shape of my TV model classes
var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.getDescription = function () {
        return this.description; // Will be used to modify onto the existing description
    };
    return TV;
}());
// A model of a TV
var LGTv = /** @class */ (function (_super) {
    __extends(LGTv, _super);
    function LGTv() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'LG TV'; // This is the basic description without any decorator features
        return _this;
    }
    LGTv.prototype.cost = function () {
        return 900; // Returning the current price without any decorator features
    };
    return LGTv;
}(TV));
// A model of a TV
var SamsungTv = /** @class */ (function (_super) {
    __extends(SamsungTv, _super);
    function SamsungTv() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = 'Samsung TV'; // This is the basic description without any decorator features
        return _this;
    }
    SamsungTv.prototype.cost = function () {
        return 1100; // Returning the current price without any decorator features
    };
    return SamsungTv;
}(TV));
// Abstract class that will extend the TV class and will include the decorator features
var TvOptions = /** @class */ (function (_super) {
    __extends(TvOptions, _super);
    function TvOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TvOptions;
}(TV));
// Decorator feature for my TV models
var UltraHD = /** @class */ (function (_super) {
    __extends(UltraHD, _super);
    function UltraHD(tv) {
        var _this = _super.call(this) || this;
        _this.decoratedTv = tv;
        return _this;
    }
    // Adding onto the existing description to include that it has this feature
    UltraHD.prototype.getDescription = function () {
        return this.decoratedTv.getDescription() + ', UltraHD quality';
    };
    // Increasing the current cost to include that it has this feature
    UltraHD.prototype.cost = function () {
        return this.decoratedTv.cost() + 300;
    };
    return UltraHD;
}(TvOptions));
// Surround sound feature
var SurroundSound = /** @class */ (function (_super) {
    __extends(SurroundSound, _super);
    function SurroundSound(tv) {
        var _this = _super.call(this) || this;
        _this.decoratedTv = tv;
        return _this;
    }
    // Adding onto the existing description to include that it has this feature
    SurroundSound.prototype.getDescription = function () {
        return this.decoratedTv.getDescription() + ', Surround sound speakers';
    };
    // Increasing the current cost to include that it has this feature
    SurroundSound.prototype.cost = function () {
        return this.decoratedTv.cost() + 150;
    };
    return SurroundSound;
}(TvOptions));
// Executing the code
var myTv = new LGTv(); // Creating an instance of an LG TV
myTv = new SurroundSound(myTv); // Adding the surround sound feature to my LG TV instance
console.log(myTv.cost()); // sending the price and description to the console with the new feature included, so price will be higher
console.log(myTv.getDescription());
