export interface ICreateTicketDTO {
  id: string;
  price: number;
  title: string;
  version: number;
  order_id?: string;
}