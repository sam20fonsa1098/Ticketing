import { BadRequestError, NotFoundError, OrderStatus } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { Tickets } from "../../infra/typeorm/entities/Tickets";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";
import { ITicketsRepository } from "../../repositories/models/ITicketsRepository";
import { IRequest } from './interfaces';

interface IResponse extends Orders{
  ticket: Tickets;
}

@injectable()
class CreateOrderService {

  private EXPIRATION_IN_MINUTES = 15;

  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository, 
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(data: IRequest): Promise<IResponse> {
    const ticket = await this.ticketsRepository.findTicketById(data.ticket_id);
    if (!ticket) {
      throw new NotFoundError();
    };
    let order = await this.ordersRepository.findOrderByTicketId(data.ticket_id);
    if (this.isReserved(order)) {
      throw new BadRequestError('Ticket is already reserved');
    }
    const expires_at = new Date();
    expires_at.setMinutes(expires_at.getMinutes() + this.EXPIRATION_IN_MINUTES);
    order = await this.ordersRepository.createOrder({ 
      ...data, 
      expires_at, 
      status: OrderStatus['Created'] 
    });
    Object.assign(order, { ticket })
    return order as IResponse;
  }

  private isReserved(order: Orders | undefined) {
    const reservedStatus = [OrderStatus['AwaitingPayment'], OrderStatus['Complete'], OrderStatus['Created']]
    return order && reservedStatus.includes(order.status);
  }
}

export { CreateOrderService };