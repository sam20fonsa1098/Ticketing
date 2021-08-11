import { ObjectID } from "mongodb";
import { getMongoRepository, MongoRepository } from "typeorm";
import { ICreateTicketDTO } from "../../../dtos/ICreateTicketDTO";
import { ITicketsRepository } from "../../../repositories/models/ITicketsRepository";
import { Tickets } from "../entities/Tickets";

class TicketsRepository implements ITicketsRepository {
  repository: MongoRepository<Tickets>;

  constructor() {
    this.repository = getMongoRepository(Tickets)
  }

  public async createTicket(data: ICreateTicketDTO): Promise<Tickets> {
    const ticket = this.repository.create(data);
    await this.repository.save(ticket);
    return ticket;
  }

  public async udpateTicket(data: ICreateTicketDTO): Promise<Tickets> {
    const ticket = await this.findTicketById(data.id);
    Object.assign(ticket, { ...data });
    await this.repository.save(ticket!);
    return ticket!;
  }

  public async findTicketById(id: string): Promise<Tickets | undefined> {
    const ticket = await this.repository.findOne(id);
    return ticket;
  }
}

export { TicketsRepository }