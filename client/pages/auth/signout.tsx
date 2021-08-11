import { useEffect, useCallback } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks/Request';

const SignOut = () => {
  const { doRequest } = useRequest();

  const handleOnSignOut = useCallback(async () => {
    await doRequest({
      body: {}, 
      url: 'users/signout', 
      method: 'post',
      onSucess: () => Router.push('/')
    });
  }, [doRequest]);

  useEffect(() => {
    handleOnSignOut();
  }, [handleOnSignOut]);

  return (
    <div>Signing you out...</div>
  );
}

export default SignOut;