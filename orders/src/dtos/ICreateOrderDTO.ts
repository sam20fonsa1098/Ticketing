import { OrderStatus } from '@sam20fonsa1098tickets/common';

export interface ICreateOrderDTO {
  id?: string
  user_id: string;
  status: OrderStatus;
  ticket_id: string;
  expires_at: Date;
}