const stripe = require('stripe')('STRIPE_KEY')

const completePayment = async (payment_method,amount) => {
    try {
      // Create a PaymentIntent or SetupIntent on the server using stripe.js
      const intent = await stripe.paymentIntents.create({
        payment_method,
        amount: amount, // Set your desired amount in cents
        currency: 'rwf',
        confirm: true,
      });
  
      // Return the client secret from the intent
      return { clientSecret: intent.client_secret };
    } catch (error) {
      console.error('Error:', error);
      // If an error occurs, throw an exception
      throw new Error('Payment failed');
    }
  };


  module.exports=completePayment;
  