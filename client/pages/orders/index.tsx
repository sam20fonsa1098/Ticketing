import { NextPageContext } from "next";
import { api } from "../../services/api";

interface IOrder {
  id: string;
  ticket: {
    title: string;
  }
  status: string;
}

interface IOrders{
  orders: Array<IOrder>
}


const Orders = ({orders}: IOrders) => {
  return (
    <ul>
      {orders.map(order => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li> 
        );
      })}
    </ul>
  );
}

Orders.getInitialProps = async ({req}: NextPageContext) => {
  const { data } = await api(req).get('orders');
  return data;
}

export default Orders;