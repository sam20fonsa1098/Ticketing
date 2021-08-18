import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserAlreadyExistsValidator } from 'validators/implementations/UserAlreadyExistsValidator';

import { CreatUserService } from '@services/implementations/CreateUserService';

class UsersController {
  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const createUserService = container.resolve(CreatUserService);
    createUserService.setValidators([new UserAlreadyExistsValidator()]);
    await createUserService.execute(request.body);
    return response.status(201).send();
  };

  public index = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const { user } = request;
    return response.status(200).json(user);
  };
}

export { UsersController };
