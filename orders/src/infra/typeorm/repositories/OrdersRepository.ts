import { getMongoRepository, MongoRepository } from "typeorm";
import { OrderStatus } from '@sam20fonsa1098tickets/common';
import { ICreateOrderDTO } from "../../../dtos/ICreateOrderDTO";
import { IOrdersRepository } from "../../../repositories/models/IOrdersRepository";
import { Orders } from "../entities/Orders";

class OrdersRepository implements IOrdersRepository {
  repository: MongoRepository<Orders>

  constructor() {
    this.repository = getMongoRepository(Orders);
  }

  public async createOrder(data: ICreateOrderDTO): Promise<Orders> {
    const order = this.repository.create(data);
    await this.repository.save(order);
    return order;
  }

  public async cancelOrder(id: string): Promise<Orders> {
    const order = await this.findOrderById(id);
    Object.assign(order, { status:  OrderStatus['Cancelled']})
    await this.repository.save(order!);
    return order!;
  }

  public async completeOrder(id: string): Promise<Orders> {
    const order = await this.findOrderById(id);
    Object.assign(order, { status:  OrderStatus['Complete']});
    await this.repository.save(order!);
    return order!;
  }

  public async findOrderById(id: string): Promise<Orders | undefined> {
    const order = await this.repository.findOne(id);
    return order;
  }

  public async findOrdersByUserId(user_id: string): Promise<Array<Orders>> {
    const orders = await this.repository.find({where: { user_id }, relations: ['ticket']});
    return orders;
  }

  public async findOrderByTicketId(ticket_id: string): Promise<Orders | undefined> {
    const order = await this.repository.findOne({where: { ticket_id }, relations: ['ticket']});
    return order;
  }
}

export { OrdersRepository }