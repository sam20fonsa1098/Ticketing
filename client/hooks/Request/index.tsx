import { api } from '../../services/api';
import React, { useState, useCallback, useContext, createContext } from 'react';
import { IApiError, IUseRequestProps, RequestProps } from './interfaces';

const RequestContext = createContext<RequestProps>({} as RequestProps);

const RequestProvider: React.FC = ({ children }) => {
  const [apiErrors, setApiErrors] = useState<Array<IApiError>>([]);

  const doRequest = useCallback(async ({ method, url, body, onSucess}: IUseRequestProps) => {
    setApiErrors([]);
    try {
      const response = await api(undefined)[method](url, body);
      if (onSucess) {
        onSucess(response.data);
      }
      return response.data;
    } catch(error) {
      setApiErrors(error.response.data.errors)
    }
  }, []);

  return (
    <RequestContext.Provider value={{
      doRequest,
      apiErrors
    }}>
      {children}
    </RequestContext.Provider>
  )
}

const useRequest = (): RequestProps => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequest must be used within an RequestProvider');
  }
  return context;
};

export { RequestProvider, useRequest };

