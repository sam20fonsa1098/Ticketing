import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@sam20fonsa1098tickets/common";
import { inject, injectable } from "tsyringe";
import { ICreateChargeDTO } from "../../dtos/ICreateChargeDTO";
import { Payments } from "../../infra/typeorm/entities/Payments";
import { IPaymentsProvider } from "../../providers/PaymentsProvider/models/IPaymentsProvider";
import { IOrdersRepostiroy } from "../../repositories/models/IOrdersRepository";
import { IPaymentsRepository } from "../../repositories/models/IPaymentsRepository";

@injectable()
class CreateChargeService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepostiroy,
    @inject('PaymentsRepository') private paymentsRepository: IPaymentsRepository,
    @inject('PaymentsProvider') private paymentsProvider: IPaymentsProvider
  ){}
  public async execute(data: ICreateChargeDTO): Promise<Payments> {
    const order = await this.ordersRepository.findOrderById(data.order_id);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.user_id !== data.user_id) {
      throw new UnauthorizedError('You are not allowed to charge this order');
    }
    if (order.status === OrderStatus['Cancelled']) {
      throw new BadRequestError('You can not charge an cancelled order');
    }
    if (order.status === OrderStatus['Complete']) {
      throw new BadRequestError('You can not charge an completed order');
    }
    const charge = await this.paymentsProvider.charge({
      amount: order.price * 100,
      currency: 'usd',
      source: data.token
    });
    const payment = await this.paymentsRepository.createPayment({order_id: order.id.toString(), stripe_id: charge.id});
    return payment
  }
}

export { CreateChargeService };