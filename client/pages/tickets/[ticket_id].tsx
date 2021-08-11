import { NextPageContext } from "next";
import Router from "next/router";
import { useCallback } from "react";
import { ErrorsContainer } from "../../components/Errors";
import { useRequest } from "../../hooks/Request";
import { api } from "../../services/api";

interface ITicket {
  id: string;
  price: number;
  title: string;
}

const Ticket = ({ price, title, id }: ITicket) => {
  const { apiErrors, doRequest } = useRequest();
  
  const onSubmit = useCallback(async () => {
    await doRequest({
      body: {ticket_id: id}, 
      url: 'orders', 
      method: 'post', 
      onSucess: (order) => Router.push('/orders/[order_id]', `/orders/${order.id}`)
    });
  }, [doRequest, id]);
  
  return (
    <div>
      <h1>{title}</h1>
      <h4>Price: {price}</h4>
      <ErrorsContainer apiErrors={apiErrors}/>
      <button className="btn btn-primary" onClick={onSubmit}>Purchase</button>
    </div>
  );
}

Ticket.getInitialProps = async ({ query, req }: NextPageContext) => {
  const { ticket_id } = query;
  const { data } = await api(req).get(`tickets/${ticket_id}`);
  return data
}

export default Ticket;