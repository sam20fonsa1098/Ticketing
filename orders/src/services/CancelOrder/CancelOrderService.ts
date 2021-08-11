import { BadRequestError, NotFoundError, OrderStatus, UnauthorizedError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { ICancelOrderDTO } from "../../dtos/ICancelOrderDTO";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";

@injectable()
class CancelOrderService {

  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(data: ICancelOrderDTO): Promise<Orders> {
    let order = await this.ordersRepository.findOrderById(data.id);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.user_id !== data.user_id) {
      throw new UnauthorizedError('Invalid User');
    }
    if (order.status === OrderStatus['Complete'] ) {
      throw new BadRequestError('You can not cancel a completed order');
    }
    order = await this.ordersRepository.cancelOrder(data.id);
    return order;
  }
}

export { CancelOrderService };