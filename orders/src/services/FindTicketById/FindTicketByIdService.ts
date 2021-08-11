import { NotFoundError } from "@sam20fonsa1098tickets/common";
import { injectable, inject } from "tsyringe";
import { Tickets } from "../../infra/typeorm/entities/Tickets";
import { ITicketsRepository } from "../../repositories/models/ITicketsRepository";

@injectable()
class FindTicketByIdService {

  constructor(
    @inject('TicketsRepository') private ticketsRepository: ITicketsRepository, 
  ){};

  public async execute(id: string): Promise<Tickets> {
    const ticket = await this.ticketsRepository.findTicketById(id);
    if (!ticket) {
      throw new NotFoundError();
    }
    return ticket;
  }
}

export { FindTicketByIdService };