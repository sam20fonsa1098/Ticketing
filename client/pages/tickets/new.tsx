import Router from 'next/router';
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ErrorsContainer } from "../../components/Errors";
import { useRequest } from "../../hooks/Request";

const NewTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { apiErrors, doRequest } = useRequest();
  
  const onSubmit = useCallback(async (data: FormData) => {
    await doRequest({
      body: data, 
      url: 'tickets', 
      method: 'post',
      onSucess: () => Router.push('/')
    });
  }, [doRequest]);

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" {...register("title", {required: true})}/>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input className="form-control" {...register("price", {required: true, valueAsNumber: true})}/>
        </div>
        <ErrorsContainer apiErrors={apiErrors}/>
        <button className="btn btn-primary" type="submit"></button>
      </form>
    </div>
  );
}

export default NewTicket;