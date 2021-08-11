import { UnauthorizedError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { ICreateTicketDTO } from "../../dtos/ICreateTicketDTO";
import { Tickets } from "../../infra/typeorm/entities/Tickets";
import { ITicketsRepository } from "../../repositories/models/ITicketsRepository";

@injectable()
class CreateTicketService {

  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository, 
  ){};

  public async execute(data: ICreateTicketDTO): Promise<Tickets> {
    let ticket = await this.ticketsRepository.findTicketById(data.id);
    if (ticket) {
      throw new UnauthorizedError('Not authorized to create a ticket that was already created');
    }
    ticket = await this.ticketsRepository.createTicket(data);
    return ticket;
  }
}

export { CreateTicketService };