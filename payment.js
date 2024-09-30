const stripe = Stripe("pk_test_51Q390LIVlokKHLiOeJrXaLoHnor6TH1Uw0xRWrVgi9YVp7O9jJhp2Ww50I4aC32J9Oh7H9cy1f28iBVJwjNlCTD200ey6G5bvp");
let elements;


async function initializeStripe() {
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        console.log('submitting fomr, amount:', amount);

        try {
            //fetch client secret key
            const response =await fetch('http://localhost:3000/api/create-payment-intent', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({amount: amount}) //sending our rent amounnt to the server  
            });


            const {clientSecret} = await response.json();
            console.log("client secret received", clientSecret);

            if(!clientSecret){
                throw new error("Missing client secret");
            }

            //using the client secret to confirm the payment
            const {error, paymentIntent} = await stripe.confirmCardPayment (clientSecret, {
                payment_method:{
                    card: elements.getElement('card'),
                },
            });

            if (error){
                document.getElementById('payment-results').textContent = `Payement Failed: ${error.message}`
            } else if (paymentIntent.status === 'succeeded') {
                document.getElementById('payment-results').textContent = 'Payment successful!'
            }


        } catch (error) {
            console.error("Error creating payment intent", error);
        }
        
    });
    
}



/*async function initializeStripe() {
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
          card: cardElement
        }
      });

      if (error) {
        document.getElementById('payment-result').textContent = `Payment failed: ${error.message}`;
      } else if (paymentIntent.status === 'succeeded') {
        document.getElementById('payment-result').textContent = 'Payment successful!';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeStripe();
  });

  document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    initializeStripe(); // Call to initiate Stripe payment flow
  }); */