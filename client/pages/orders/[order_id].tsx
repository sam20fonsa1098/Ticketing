import { NextPageContext } from "next";
import { useCallback, useEffect, useState } from "react";
import StripeCheckout, { Token } from 'react-stripe-checkout';
import Router from 'next/router';
import { IUser } from "../../components/Header/interfaces";
import { useRequest } from "../../hooks/Request";
import { api } from "../../services/api";
import { ErrorsContainer } from "../../components/Errors";

interface IOrder {
  id: string;
  expires_at: string;
  ticket: {
    id: string;
    price: number;
  }
  user: IUser
}

const Order = ({id, expires_at, ticket, user}: IOrder) => {
  const [timeLeft, setTimeLeft] = useState(new Date(expires_at).getTime() - new Date().getTime());
  const { apiErrors, doRequest } = useRequest();

  const handleOnSetTimeLeft = useCallback(() => {
    setTimeLeft(new Date(expires_at).getTime() - new Date().getTime())
  }, [expires_at]);

  useEffect(() => {
    const timerId = setInterval(handleOnSetTimeLeft, 1000);
    return () => { clearInterval(timerId) };
  }, [handleOnSetTimeLeft]);

  const onSubmit = useCallback(async (token: Token) => {
    await doRequest({
      body: {token: token.id, order_id: id}, 
      url: 'payments', 
      method: 'post', 
      onSucess: () => Router.push('/orders')
    });
  }, [doRequest, id]);

  if (timeLeft <= 0) {
    return (
      <div>
        Order Expired
      </div>
    );
  }

  return (
    <div>
      {Math.round(timeLeft / 1000).toFixed(2)} seconds until order expires
      <ErrorsContainer apiErrors={apiErrors}/>
      <StripeCheckout 
        token={onSubmit} 
        stripeKey={process.env.STRIPE_PUBLIC_KEY!}
        amount={ticket.price * 100}
        email={user.email}
      />
    </div>
  );
}

Order.getInitialProps = async ({ query, req }: NextPageContext) => {
  const { order_id } = query; 
  const { data } = await api(req).get(`orders/${order_id}`);
  return data;
}

export default Order;