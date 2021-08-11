import 'bootstrap/dist/css/bootstrap.css';
import { AppProps, AppContext } from 'next/app';
import { HooksProvider } from '../hooks';
import { api } from '../services/api';
import { IUser } from '../components/Header/interfaces';
import { Header } from '../components/Header';

interface CustomAppProps extends AppProps {
  user: IUser
}

const AppComponent = ({ Component, pageProps, user }: CustomAppProps) => {
  return (
    <HooksProvider>
      <Header {...user}/>
      <div className="container">
        <Component {...pageProps} user={user} />
      </div>
    </HooksProvider>
  )
}

AppComponent.getInitialProps = async ({ ctx, Component }: AppContext) => {
  try {
    const response = await api(ctx.req).get('users');
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      ...pageProps,
      user: response.data
    }
  } catch(err) {
    return {}
  }
};

export default AppComponent;