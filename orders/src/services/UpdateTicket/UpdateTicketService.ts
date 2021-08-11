import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { ICreateTicketDTO } from "../../dtos/ICreateTicketDTO";
import { Tickets } from "../../infra/typeorm/entities/Tickets";
import { ITicketsRepository } from "../../repositories/models/ITicketsRepository";

@injectable()
class UpdateTicketService {

  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository, 
  ){};

  public async execute(data: ICreateTicketDTO): Promise<Tickets> {
    let ticket = await this.ticketsRepository.findTicketById(data.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket = await this.ticketsRepository.udpateTicket(data);
    return ticket;
  }
}

export { UpdateTicketService };