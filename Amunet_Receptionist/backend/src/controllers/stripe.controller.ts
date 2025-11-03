import { Request, Response } from 'express';
import db from '../db/connection';
import stripeService from '../services/stripe.service';
import logger from '../utils/logger';

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const { email, plan } = req.body;

    // Map plan to Stripe price ID
    const priceMap: Record<string, string> = {
      core: process.env.STRIPE_PRICE_CORE || '',
      growth: process.env.STRIPE_PRICE_GROWTH || '',
    };

    const priceId = priceMap[plan];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Create or get customer
    const customer = await stripeService.createCustomer(email);

    // Create checkout session
    const session = await stripeService.createCheckoutSession(
      customer.id,
      priceId,
      `${process.env.APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      `${process.env.MARKETING_URL}/pricing`
    );

    res.json({ url: session.url });
  } catch (error) {
    logger.error('Checkout creation failed', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
};

export const webhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = await stripeService.constructWebhookEvent(req.body, sig);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        // Find user by customer ID or email
        const customer = await stripeService.getSubscription(subscriptionId);
        
        logger.info('Checkout completed', { customerId, subscriptionId });
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        await db('subscriptions')
          .where({ stripe_subscription_id: subscription.id })
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000),
          });

        logger.info('Subscription updated', { subscriptionId: subscription.id });
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Stripe webhook error', error);
    res.status(400).send('Webhook error');
  }
};