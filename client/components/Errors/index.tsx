import React from 'react';
import { IApiError } from '../../hooks/Request/interfaces';

interface IErrorPayload {
  apiErrors: Array<IApiError>;
}

const ErrorsContainer: React.FC<IErrorPayload> = ({ apiErrors }) => {
  return (
    <>
      {apiErrors.length > 0 && 
        (<div className="alert alert-danger">
          <h4>Oooops...</h4>
          <ul className="my-0">
            {apiErrors.map((err: IApiError) => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>)
      }
    </>
  );
}

export { ErrorsContainer };