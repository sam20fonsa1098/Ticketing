import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { natsWrapper } from '../../nats/NatsWrapper';
import { CreateOrderService } from '../../../services/CreateOrder/CreateOrderService';
import { CancelOrderService } from '../../../services/CancelOrder/CancelOrderService';
import { FindOrderByIdService } from '../../../services/FindOrderById/FindOrderByIdService';
import { FindOrdersByUserService } from '../../../services/FindOrdersByUser/FindOrdersByUserService';
import { OrderCreatedPublisher } from '../../nats/publishers/OrderCreatedPublisher';
import { OrderCancelledPublisher } from '../../nats/publishers/OrderCancelledPublisher';

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.body;
    const { id:user_id } = request.user;
    const createOrderService = container.resolve(CreateOrderService);
    const order = await createOrderService.execute({ ticket_id, user_id });
    const orderEventData = {
      ...order, 
      id: order.id.toString(),
      expires_at: order.expires_at.toISOString(),
      ticket: {
        ...order.ticket,
        id: order.ticket_id
      },
    }
    new OrderCreatedPublisher(natsWrapper.client).publish(orderEventData);
    return response.status(201).send(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id:user_id } = request.user;
    const cancelOrderService = container.resolve(CancelOrderService);
    const order = await cancelOrderService.execute({ id, user_id });
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id.toString(), 
      ticket: {id: order.ticket_id.toString()},
      version: order.version
    });
    return response.status(200).send(order);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;
    const findOrderByIdService = container.resolve(FindOrderByIdService);
    const order = await findOrderByIdService.execute({ id, user_id });
    return response.status(200).send(order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const findOrdersByUserService = container.resolve(FindOrdersByUserService);
    const orders = await findOrdersByUserService.execute(id);
    return response.status(200).send(orders);
  }

};

export { OrdersController };