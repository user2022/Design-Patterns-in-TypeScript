var Order = /** @class */ (function () {
    function Order() {
        // Creating a new object with selected state using this order class object as the parameter value
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);
        // When I place an order, place the state into the payment pending state
        this.setState(this.paymentPendingState);
    }
    // This method will be used to set the current state to a new state
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    // This method will return the current state
    Order.prototype.getState = function () {
        return this.currentState;
    };
    return Order;
}());
// Classes for each state that the order can be
var PaymentPendingState = /** @class */ (function () {
    // Set my order property to a new order object
    function PaymentPendingState(order) {
        this.order = order;
    }
    // Cancel the order and set state to cancelled order if the current state is paymentPending
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log('Cancelling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    };
    // Give a message but don't change state
    PaymentPendingState.prototype.shipOrder = function () {
        console.log('Cannot ship the order when payment is pending');
    };
    // If the payment has been verified change it to the preparing order state
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log('Payment verified! Shipping soon');
        this.order.setState(this.order.orderBeingPreparedState);
    };
    return PaymentPendingState;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    // Give messages now that the order has been cancelled, nothing more can be done
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log('Your order has already been cancelled');
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log('Order cannot ship as it has been cancelled');
    };
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log('Order is cancelled, you cannot verify payment');
    };
    return CancelledOrderState;
}());
var OrderBeingPreparedState = /** @class */ (function () {
    function OrderBeingPreparedState(order) {
        this.order = order;
    }
    // If the order is cancelled whilst being prepared, set to cancelled state
    OrderBeingPreparedState.prototype.cancelOrder = function () {
        console.log('Cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    };
    // The next default step is to ship the order so change to orderShipped state
    OrderBeingPreparedState.prototype.shipOrder = function () {
        console.log('Shipping your order now');
        this.order.setState(this.order.orderShippedState);
    };
    OrderBeingPreparedState.prototype.verifyPayment = function () {
        console.log('Already verified your payment');
    };
    return OrderBeingPreparedState;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(order) {
        this.order = order;
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log('Order is shipped cannot be cancelled');
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log('You cannot ship it again, order already shipped');
    };
    OrderShippedState.prototype.verifyPayment = function () {
        console.log('You cannot verify payment, order is already shipped');
    };
    return OrderShippedState;
}());
var order = new Order(); // Creating a new order
order.getState().verifyPayment(); // Verifying payment which is the next step
order.getState().shipOrder(); // Shipping the order
order.getState().cancelOrder(); // Won't work since order is already shipped
console.log('Order state: ' + order.getState().constructor.name); // tells the current state of the order
