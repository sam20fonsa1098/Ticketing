import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { AuthenticateUserService } from '../../../services/AuthenticateUser';

class SessionsController {
  public create = async (request: Request, response: Response): Promise<Response> => {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const data = await authenticateUserService.execute(request.body);
    response.cookie('jwt', data.token)
    return response.status(200).json(classToClass(data.user));
  }

  public delete = async (request: Request, response: Response): Promise<Response> => {
    response.cookie('jwt', undefined)
    return response.send({});
  }
}

export { SessionsController };