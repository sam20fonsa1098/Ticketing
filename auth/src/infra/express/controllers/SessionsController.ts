import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CheckUserExistsValidator } from 'validators/implementations/CheckUserExistsValidator';

import { AuthenticateUserService } from '@services/implementations/AuthenticateUserService';
import { GenerateTokensService } from '@services/implementations/GenerateTokensService';

class SessionsController {
  private authenticateUserService: AuthenticateUserService;
  constructor() {
    this.authenticateUserService = container.resolve(AuthenticateUserService);
    this.authenticateUserService.setObservers([
      container.resolve(GenerateTokensService),
    ]);
    this.authenticateUserService.setValidators([
      new CheckUserExistsValidator(),
    ]);
  }

  public create = async (
    request: Request,
    response: Response,
  ): Promise<Response> => {
    const data = await this.authenticateUserService.execute(request.body);
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
