import Stripe from 'stripe';
import { IPaymentsProvider, IPayload } from '../models/IPaymentsProvider';

class StripePaymentsProvider implements IPaymentsProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET!, {
      apiVersion: '2020-08-27',
    })
  }

  public async charge(data: IPayload): Promise<{id: string}> {
    return await this.stripe.charges.create(data);
  }
};

export { StripePaymentsProvider };