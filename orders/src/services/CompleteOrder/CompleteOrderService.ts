import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { ICompleteOrderDTO } from "../../dtos/ICompleteOrderDTO";
import { Orders } from "../../infra/typeorm/entities/Orders";
import { IOrdersRepository } from "../../repositories/models/IOrdersRepository";

@injectable()
class CompleteOrderService {

  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository
  ){};

  public async execute(data: ICompleteOrderDTO): Promise<Orders> {
    let order = await this.ordersRepository.findOrderById(data.id);
    if (!order) {
      throw new NotFoundError();
    }
    order = await this.ordersRepository.completeOrder(data.id);
    return order;
  }
}

export { CompleteOrderService };