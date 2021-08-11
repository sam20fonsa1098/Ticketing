import { ITicketDTO } from '../../dtos/ITicketDTO';
import { Tickets } from '../../infra/typeorm/entities/Tickets';

export interface ITicketsRepository {
  createTicket(data: ITicketDTO): Promise<Tickets>;
  findTicketById(id: string): Promise<Tickets | undefined>;
  findTickets(): Promise<Array<Tickets>>;
}