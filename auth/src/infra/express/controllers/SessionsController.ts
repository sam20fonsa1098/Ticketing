import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@services/implementations/AuthenticateUserService';
import { GenerateTokensService } from '@services/implementations/GenerateTokensService';
import { CheckUserExistsValidator } from '@validators/implementations/CheckUserExistsValidator';

class SessionsController {
  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    authenticateUserService.setObservers([
      container.resolve(GenerateTokensService),
    ]);
    authenticateUserService.setValidators([new CheckUserExistsValidator()]);
    const data = await authenticateUserService.execute(request.body);
    response.cookie('jwt', data.token);
    return response.status(200).json(classToClass(data.user));
  };

  public delete = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    response.cookie('jwt', undefined);
    return response.send({});
  };
}

export { SessionsController };
