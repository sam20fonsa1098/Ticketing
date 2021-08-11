import { inject, injectable } from "tsyringe";
import { Tickets } from '../../infra/typeorm/entities/Tickets';
import { ITicketsRepository } from '../../repositories/models/ITicketsRepository';

@injectable()
class ShowTicketsService {
  constructor(
    @inject('TicketsRepository') 
    private ticketsRepository: ITicketsRepository,
  ){}
  public execute = async (): Promise<Array<Tickets>> => {
    const tickets = await this.ticketsRepository.findTickets();
    return tickets;
  }
};

export { ShowTicketsService };