import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { inject, injectable } from "tsyringe";
import { Tickets } from '../../infra/typeorm/entities/Tickets';
import { ITicketsRepository } from '../../repositories/models/ITicketsRepository';
import { IRequest } from "./interfaces";

@injectable()
class UpdateTicketService {
  constructor(
    @inject('TicketsRepository') 
    private ticketsRepository: ITicketsRepository,
  ){}
  public execute = async (data: IRequest): Promise<Tickets> => {
    const ticket = await this.ticketsRepository.findTicketById(data.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.order_id = data.order_id;
    await this.ticketsRepository.createTicket({...ticket, id: ticket.id.toString()});
    return ticket;
  }
};

export { UpdateTicketService };