import { useCallback } from 'react';
import { useForm } from "react-hook-form";
import Router from 'next/router';
import { useRequest } from '../../hooks/Request';
import { ErrorsContainer } from '../../components/Errors';

interface FormData {
  password: string;
  email: string
}

interface IApiError {
  message: string;
  field?: string;
}


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { apiErrors, doRequest } = useRequest();
  
  const onSubmit = useCallback(async (data: FormData) => {
    await doRequest({
      body: data, 
      url: 'users/signin', 
      method: 'post', 
      onSucess: () => Router.push('/')
    });
  }, [doRequest]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input type="text" className="form-control" {...register("email", {required: true})}/>
        {errors.email && <span>Email is required</span>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="text" className="form-control" {...register("password", {required: true})}/>
        {errors.password && <span>Password is required</span>}
      </div>
      <ErrorsContainer apiErrors={apiErrors}/>
      <button className="btn btn-primary" type="submit">Sign In</button>
    </form>
  );
};

export default SignUp;