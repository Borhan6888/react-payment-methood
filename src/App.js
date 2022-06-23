import React, { useState } from 'react';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //Product Object name,price

  // const configure()

  const [product] = useState({
    name: 'Sample Mario Game',
    price: 1000,
    description: 'This is sample mario game',
  });

  async function handleToken(token, adresses) {
    const response = await axios.post('http://localhost:5000/checkout', {
      token,
      product,
    });
    console.log(response.status);
    if (response.status === 200) {
      toast('Success Pyment is Completed', { type: 'success' });
    } else {
      toast('Failure payment is not completed', { type: 'error' });
    }
  }

  return (
    <div className="App">
      <br></br>
      <div className="container">
        <h1 className="text-center">Stripe Payment Checkout Demo</h1>
        <br></br>

        <h2 className="text-center">Product Info</h2>
        <h2 className="text-center">Product Name: {product.name}</h2>
        <h2 className="text-center">Product Price: {product.price}</h2>
        <h2 className="text-center">
          Product description: {product.description}
        </h2>

        <br></br>

        <div className="form-group-container">
          <StripeCheckout
            className="center"
            stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            token={handleToken}
            amount={product.price * 100}
            name={product.name}
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}

export default App;
