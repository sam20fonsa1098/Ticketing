import { ICreateTicketDTO } from "../../dtos/ICreateTicketDTO";
import { Tickets } from "../../infra/typeorm/entities/Tickets";

export interface ITicketsRepository {
  createTicket(data: ICreateTicketDTO): Promise<Tickets>;
  udpateTicket(data: ICreateTicketDTO): Promise<Tickets>;
  findTicketById(id: string): Promise<Tickets | undefined>;
}