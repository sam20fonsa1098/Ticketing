import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { Orders } from "../../infra/typeorm/entities/Orders";

export interface IOrdersRepostiroy {
  createOrder(data: ICreateOrderDTO): Promise<Orders>;
  cancelOrder(id: string): Promise<Orders>;
  findOrderById(id: string): Promise<Orders | undefined>;
}