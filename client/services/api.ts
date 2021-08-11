import axios from 'axios';
import { IncomingMessage } from 'http';

const api = (req: IncomingMessage | undefined) => {
  const response = typeof window === 'undefined' ? axios.create({
    headers: req?.headers,
    baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api'
  }) : axios.create({
    baseURL: 'https://ticketing.dev/api',
    headers: req?.headers
  });
  return response;
}


export { api };