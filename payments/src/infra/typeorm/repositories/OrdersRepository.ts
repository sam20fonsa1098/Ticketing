import { getMongoRepository, MongoRepository } from "typeorm";
import { ObjectID } from 'mongodb';
import { ICreateOrderDTO } from "../../../dtos/ICreateOrderDTO";
import { IOrdersRepostiroy } from "../../../repositories/models/IOrdersRepository";
import { Orders } from "../entities/Orders";
import { OrderStatus } from "@sam20fonsa1098tickets/common";

class OrdersRepository implements IOrdersRepostiroy {
  private repository: MongoRepository<Orders>;

  constructor() {
    this.repository = getMongoRepository(Orders);
  }

  public async createOrder(data: ICreateOrderDTO): Promise<Orders> {
    const order = this.repository.create(data);
    Object.assign(order,  { _id: new ObjectID(data.id) });
    await this.repository.save(order);
    return order;
  }

  public async cancelOrder(id: string): Promise<Orders> {
    const order = await this.findOrderById(id);
    Object.assign(order,  { status: OrderStatus['Cancelled'] });
    await this.repository.save(order!);
    return order!;
  } 

  public async findOrderById(id: string): Promise<Orders | undefined> {
    const order = await this.repository.findOne(id);
    return order;
  }
}

export { OrdersRepository };