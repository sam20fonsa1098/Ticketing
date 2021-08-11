import { RequestProvider } from './Request';

const HooksProvider: React.FC = ({children}) => {
  return (
    <RequestProvider>
      {children}
    </RequestProvider>
  )
};

export {HooksProvider};