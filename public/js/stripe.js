import axios from 'axios';
const stripe = Stripe('pk_test_51JBgyXLNSVusOOXaABN0qzlVrslDVxPJHUyl8zjiaCU7w3MfhJyK0vL9lC6wFcmi1LMViS7ddwByxHWeR5brI10100WAGVYNJZ');
import { showAlert } from './alerts';

export const bookTour = async tourId => {
    try {
    // 1) Get checkout session from API
    const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);

    console.log(session);

    // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })

    } catch(err) {
        console.log(err);
        showAlert('error', err)
    }
}