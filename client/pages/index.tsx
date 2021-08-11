import { api } from '../services/api';
import { IUser } from '../components/Header/interfaces';
import { NextPageContext } from 'next';
import Link from 'next/link';

interface ITicket {
  id: string;
  price: number;
  title: string;
}


const LandingPage = ({ user, tickets }: {user: IUser, tickets: Array<ITicket>}) => {
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket: ITicket) => {
            return (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                  <Link href="/tickets/[ticket_id]" as={`/tickets/${ticket.id}`}>
                    <a className="nav-link">View</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async ({req}: NextPageContext) => {
  try {
    const response = await api(req).get('/tickets');
    return {
      tickets: response.data
    }
  } catch(err) {
    console.log(err);
  }
};

export default LandingPage;