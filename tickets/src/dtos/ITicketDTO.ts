export interface ITicketDTO {
  id?: string;
  title: string;
  price: number;
  user_id: string;
  order_id?: string;
}