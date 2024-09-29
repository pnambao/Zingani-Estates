const stripe = Stripe("sk_test_51Q390LIVlokKHLiOBMWfBQlaFe36TlER25jBqR3oMH3msHwdk9oz7Ki0dUfNDFrZweSsEotbHTAvpEGsilKLAA7V00l0iWiDuY");
let elements;

async function initializeStripe() {
    // Request a Payment Intent from the backend
    const amount = document.getElementById('amount').value;
    const response = await fetch('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amount }),
    });
    const { clientSecret } = await response.json();

    // Set up Stripe Elements for card info
    elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    // Handle payment submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        document.getElementById('payment-result').textContent = `Payment failed: ${error.message}`;
      } else if (paymentIntent.status === 'succeeded') {
        document.getElementById('payment-result').textContent = 'Payment successful!';
      }
    });
  }

  document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    initializeStripe(); // Call to initiate Stripe payment flow
  });