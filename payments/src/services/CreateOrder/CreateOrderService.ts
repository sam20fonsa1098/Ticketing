import { BadRequestError } from "@sam20fonsa1098tickets/common";
import { inject, injectable } from "tsyringe"
import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO"
import { Orders } from "../../infra/typeorm/entities/Orders"
import { IOrdersRepostiroy } from "../../repositories/models/IOrdersRepository"

@injectable()
class CreateOrderService {
  constructor(@inject('OrdersRepostiroy') private ordersRepository: IOrdersRepostiroy){

  }
  public async execute(data: ICreateOrderDTO): Promise<Orders> {
    let order = await this.ordersRepository.findOrderById(data.id);
    if (order) {
      throw new BadRequestError('Already exists a order with this id');
    }
    order = await this.ordersRepository.createOrder(data);
    return order;
  };
};

export { CreateOrderService }