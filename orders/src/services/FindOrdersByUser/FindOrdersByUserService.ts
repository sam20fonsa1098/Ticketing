import { injectable, inject } from "tsyringe";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";

@injectable()
class FindOrdersByUserService {

  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(user_id: string): Promise<Array<Orders>> {
    const orders = await this.ordersRepository.findOrdersByUserId(user_id);
    return orders;
  }
}

export { FindOrdersByUserService };