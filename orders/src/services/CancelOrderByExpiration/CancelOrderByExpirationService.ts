import { NotFoundError, OrderStatus, UnauthorizedError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";

@injectable()
class CancelOrderByExpirationService {

  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(id: string): Promise<Orders> {
    let order = await this.ordersRepository.findOrderById(id);
    if (!order) {
      throw new NotFoundError();
    }
    order = await this.ordersRepository.cancelOrder(id);
    return order;
  }
}

export { CancelOrderByExpirationService };