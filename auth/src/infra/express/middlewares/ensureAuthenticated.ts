import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { UnauthorizedError } from '@sam20fonsa1098tickets/common';
import { IAccessTokenProvider } from '../../../providers/TokenProvider/models/IAccessTokensProvider';

@injectable()
class EnsureAuthenticated {
  constructor(
    @inject('AccessTokenProvider') 
    private accessTokenProvider: IAccessTokenProvider) {
  }

  execute = async (
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    let token = request.get('Cookie');
    if (!token) {
      throw new UnauthorizedError('Missing JWT token', 401);
    }
    token = this.accessTokenProvider.getAccessToken(token);
    const user = this.accessTokenProvider.validateAccessToken(token as string);
    Object.assign(request, { user: user });
    return next();
  };
}


export { EnsureAuthenticated };
