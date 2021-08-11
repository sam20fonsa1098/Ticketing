import { Subjects } from './subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  queueGroupName: string;
  data: {
    id: string;
    title: string;
    price: number;
  };
}