import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './components/checkoutForm';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_MSZTVdqcc4IWKrUhmAn8GLJa">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
