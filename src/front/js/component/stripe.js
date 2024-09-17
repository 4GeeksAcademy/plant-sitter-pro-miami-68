import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(pk_test_51PzpoVFFnqRKlO53xvdZZPSFaZBmCl4tnIQDefqJjA4U9MvjzvaC39dTQCjx8OoLXhI68A8avrR06nSY9IAqAhTG00rEkFwjvB); // Replace with your Stripe public key

export default stripePromise;
