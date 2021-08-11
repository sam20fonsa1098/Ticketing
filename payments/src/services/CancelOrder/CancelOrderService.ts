import { inject, injectable } from "tsyringe"
import { Orders } from "../../infra/typeorm/entities/Orders"
import { IOrdersRepostiroy } from "../../repositories/models/IOrdersRepository"

@injectable()
class CancelOrderService {
  constructor(@inject('OrdersRepostiroy') private ordersRepository: IOrdersRepostiroy){

  }
  public async execute(id: string): Promise<Orders> {
    let order = await this.ordersRepository.cancelOrder(id);
    return order;
  };
};

export { CancelOrderService }