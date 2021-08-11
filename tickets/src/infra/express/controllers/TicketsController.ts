import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { natsWrapper } from '../../nats/NatsWrapper';
import { TicketCreatedPublisher } from '../../nats/publishers/TicketCreatedPublisher';
import { TicketUpdatedPublisher } from '../../nats/publishers/TicketUpdatedPublisher';
import { CreateTicketService } from '../../../services/CreateTicket/CreateTicketService';
import { ShowTicketByIdService } from '../../../services/ShowTicketById/ShowTicketByIdService';
import { ShowTicketsService } from '../../../services/ShowTickets/ShowTicketsService';


class TicketsController {
  public create = async (request: Request, response: Response): Promise<Response> => {
    const { id: user_id } = request.user;
    const { title, price } = request.body;
    const createTicketService = container.resolve(CreateTicketService);
    const ticket = await createTicketService.execute({title, price, user_id});
    new TicketCreatedPublisher(natsWrapper.client).publish({...ticket, id: ticket.id.toString()});
    return response.status(201).send(ticket);
  }

  public update = async (request: Request, response: Response): Promise<Response> => {
    const { id: user_id } = request.user;
    const { title, price } = request.body;
    const { id } = request.params;
    const createTicketService = container.resolve(CreateTicketService);
    const ticket = await createTicketService.execute({title, price, user_id, id});
    new TicketUpdatedPublisher(natsWrapper.client).publish({...ticket, id: ticket.id.toString()});
    return response.status(201).send(ticket);
  }

  public get = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const showTicketByIdService = container.resolve(ShowTicketByIdService);
    const ticket = await showTicketByIdService.execute(id);
    return response.status(200).send(ticket);
  }

  public index = async (request: Request, response: Response): Promise<Response> => {
    const showTicketsService = container.resolve(ShowTicketsService);
    const tickets = await showTicketsService.execute();
    return response.status(200).send(tickets);
  }

};

export { TicketsController }