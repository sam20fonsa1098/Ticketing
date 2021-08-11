import { NotFoundError, UnauthorizedError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";
import { IRequest } from './interfaces';


@injectable()
class FindOrderByIdService {

  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(data: IRequest): Promise<Orders> {
    const order = await this.ordersRepository.findOrderById(data.id);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.user_id !== data.user_id) {
      throw new UnauthorizedError('Invalid User');
    }
    return order;
  }
}

export { FindOrderByIdService };