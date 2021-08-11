import { inject, injectable } from "tsyringe";
import { Tickets } from '../../infra/typeorm/entities/Tickets';
import { ITicketDTO } from '../../dtos/ITicketDTO';
import { InvalidTicketOperation } from "../../errors/implementations/InvalidTicketOperation";
import { ITicketsRepository } from '../../repositories/models/ITicketsRepository';

@injectable()
class CreateTicketService {
  constructor(
    @inject('TicketsRepository') 
    private ticketsRepository: ITicketsRepository,
  ){}
  public execute = async (data: ITicketDTO): Promise<Tickets> => {
    if (data.id) {
      const ticket = await this.ticketsRepository.findTicketById(data.id);
      if (this.isInvalidTicketOperation(ticket, data)) {
        throw new InvalidTicketOperation();
      }
    }
    const ticket = await this.ticketsRepository.createTicket(data);
    return ticket;
  }

  private isInvalidTicketOperation = (ticket: Tickets | undefined, data: ITicketDTO) => {
    return !ticket || ticket.user_id !== data.user_id || ticket.order_id
  }
};

export { CreateTicketService };