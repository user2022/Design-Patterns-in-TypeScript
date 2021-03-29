// Keep track of the order it is assigned to
interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    // Setting properties for each state
    public cancelledOrderState: State;
    public paymentPendingState: State;
    public orderShippedState: State;
    public orderBeingPreparedState: State;

    public currentState: State;

    constructor() {
        // Creating a new object with selected state using this order class object as the parameter value
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);

        // When I place an order, place the state into the payment pending state
        this.setState(this.paymentPendingState);
    }

    // This method will be used to set the current state to a new state
    public setState(state: State) {
        this.currentState = state;
    }

    // This method will return the current state
    public getState(): State {
        return this.currentState;
    }
}

// Classes for each state that the order can be

class PaymentPendingState implements State {
    public order: Order;

    // Set my order property to a new order object
    constructor(order: Order) {
        this.order = order;
    }

    // Cancel the order and set state to cancelled order if the current state is paymentPending
    cancelOrder() {
        console.log('Cancelling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    }

    // Give a message but don't change state
    shipOrder() {
        console.log('Cannot ship the order when payment is pending');
    }

    // If the payment has been verified change it to the preparing order state
    verifyPayment() {
        console.log('Payment verified! Shipping soon');
        this.order.setState(this.order.orderBeingPreparedState);
    }
}

class CancelledOrderState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    // Give messages now that the order has been cancelled, nothing more can be done
    cancelOrder() {
        console.log('Your order has already been cancelled');
    }

    shipOrder() {
        console.log('Order cannot ship as it has been cancelled');
    }

    verifyPayment() {
        console.log('Order is cancelled, you cannot verify payment');
    }
}

class OrderBeingPreparedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    // If the order is cancelled whilst being prepared, set to cancelled state
    cancelOrder() {
        console.log('Cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    }

    // The next default step is to ship the order so change to orderShipped state
    shipOrder() {
        console.log('Shipping your order now');
        this.order.setState(this.order.orderShippedState);
    }

    verifyPayment() {
        console.log('Already verified your payment');
    }
}

class OrderShippedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }


    cancelOrder() {
        console.log('Order is shipped cannot be cancelled');
    }

    shipOrder() {
        console.log('You cannot ship it again, order already shipped');
    }

    verifyPayment() {
        console.log('You cannot verify payment, order is already shipped');
    }
}


let order = new Order(); // Creating a new order
order.getState().verifyPayment(); // Verifying payment which is the next step
order.getState().shipOrder(); // Shipping the order

order.getState().cancelOrder(); // Won't work since order is already shipped

console.log('Order state: ' + (<any> order.getState()).constructor.name); // tells the current state of the order


