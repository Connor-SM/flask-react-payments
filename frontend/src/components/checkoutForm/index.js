import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false
    };
  }

  handleSubmit = async(e) => {
    let {token} = await this.props.stripe.createToken({name:"Name"});

    let URL = 'http://localhost:5000/api/payment';

    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'token': token.id,
        'email': 'connorm@codingtemple.com',
        'amount': 500
      },
    });

    let data = await response.json();

    if (data.message === 'success') {
      this.setState({complete: true});
    };
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={() => this.handleSubmit()}>Purchase for $5</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
