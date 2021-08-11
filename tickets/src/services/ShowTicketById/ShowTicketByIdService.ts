import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { inject, injectable } from "tsyringe";
import { Tickets } from '../../infra/typeorm/entities/Tickets';
import { ITicketsRepository } from '../../repositories/models/ITicketsRepository';

@injectable()
class ShowTicketByIdService {
  constructor(
    @inject('TicketsRepository') 
    private ticketsRepository: ITicketsRepository,
  ){}
  public execute = async (id: string): Promise<Tickets> => {
    const ticket = await this.ticketsRepository.findTicketById(id);
    if (!ticket) {
      throw new NotFoundError()
    }
    return ticket;
  }
};

export { ShowTicketByIdService };