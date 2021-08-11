import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateChargeService } from '../../../services/CreateCharge/CreateChargeService';
import { natsWrapper } from '../../nats/NatsWrapper';
import { PaymentCreatedPublisher } from '../../nats/publishers/PaymentCreatedPublisher';

class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, order_id } = request.body;
    const { id: user_id } = request.user;
    const createChargeService = container.resolve(CreateChargeService);
    const payment = await createChargeService.execute({token, order_id, user_id});
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      ...payment,
      id: payment.id.toString()
    })
    return response.status(201).send();
  }
}

export { PaymentsController }