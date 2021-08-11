import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { Orders } from "../../infra/typeorm/entities/Orders";

export interface IOrdersRepository {
  createOrder(data: ICreateOrderDTO): Promise<Orders>;
  cancelOrder(id: string): Promise<Orders>;
  completeOrder(id: string): Promise<Orders>;
  findOrderById(id: string): Promise<Orders | undefined>;
  findOrderByTicketId(ticket_id: string): Promise<Orders | undefined>;
  findOrdersByUserId(user_id: string): Promise<Array<Orders>>;
}