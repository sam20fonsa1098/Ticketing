import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { inject, injectable } from "tsyringe"
import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Orders } from "../../infra/typeorm/entities/Orders"
import { IOrdersRepostiroy } from "../../repositories/models/IOrdersRepository"

@injectable()
class FindOrderByIdService {
  constructor(@inject('OrdersRepostiroy') private ordersRepository: IOrdersRepostiroy){

  }
  public async execute(id: string): Promise<Orders> {
    let order = await this.ordersRepository.findOrderById(id);
    if (!order) {
      throw new NotFoundError();
    }
    return order;
  };
};

export { FindOrderByIdService }