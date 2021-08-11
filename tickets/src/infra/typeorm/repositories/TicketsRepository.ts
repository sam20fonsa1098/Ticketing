import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';
import { Tickets } from '../entities/Tickets';
import { ITicketDTO } from '../../../dtos/ITicketDTO';
import { ITicketsRepository } from "../../../repositories/models/ITicketsRepository";

class TicketsRepository implements ITicketsRepository {
  repository: MongoRepository<Tickets>;

  constructor() {
    this.repository = getMongoRepository(Tickets);
  }

  public createTicket = async (data: ITicketDTO): Promise<Tickets> => {
    const ticket = data.id ? await this.findTicketById(data.id) : this.repository.create(data);
    this.handleOnUpdateTicket(ticket!, data);
    await this.repository.save(ticket!);
    return ticket!;
  }

  private handleOnUpdateTicket(ticket: Tickets, data: ITicketDTO) {
    Object.assign(ticket, { ...data, version: ticket.version ? ticket.version + 1: 1 });
  }

  public findTicketById = async (id: string): Promise<Tickets | undefined> => {
    const ticket = await this.repository.findOne(id);
    return ticket;
  }

  public findTickets = async (): Promise<Array<Tickets>> => {
    const tickets = await this.repository.find({where: {order_id: undefined}});
    return tickets;
  }
};

export { TicketsRepository };