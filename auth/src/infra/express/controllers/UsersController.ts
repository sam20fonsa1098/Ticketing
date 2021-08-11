import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreatUserService } from '../../../services/CreateUser';

class UsersController {
  public create = async (request: Request, response: Response): Promise<Response> => {
    const createUserService = container.resolve(CreatUserService);
    await createUserService.execute(request.body);
    return response.status(201).send();
  }

  public index = async (request: Request, response: Response): Promise<Response> => {
    const user = request.user;
    return response.status(200).json(user);
  }
}

export { UsersController };