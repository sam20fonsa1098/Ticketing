import { IUser } from './interfaces';
import Link from 'next/link';

interface ILink {
  label: string;
  href: string;
}


const Header: React.FC<IUser> = ({ email }) => {
  const links: Array<ILink> = [
    !email ? { label: 'Sign Up', href: '/auth/signup' } : undefined,
    !email ? { label: 'Sign In', href: '/auth/signin' } : undefined,
    email ? {label: 'Sell Ticket', href: 'tickets/new'}: undefined,
    email ? {label: 'My Orders', href: '/orders'} : undefined,
    email ? { label: 'Sign Out', href: '/auth/signout' } : undefined
  ].filter(element => element !== undefined) as Array<ILink>;

  return (
    <nav className="navbar navbar-light bg-lighy">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links.map(({href, label}) => {
            return (
              <li key={href} className="nav-item">
                <Link href={href}>
                  <a className="nav-link">{label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export { Header };