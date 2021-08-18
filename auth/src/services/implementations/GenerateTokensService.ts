import { injectable, inject } from 'tsyringe';

import { IUserTokenDTO } from '@dtos/IUserTokenDTO';
import { IAccessTokenProvider } from '@providers/TokenProvider/models/IAccessTokensProvider';
import { IService } from '@services/models/IService';

interface IResponse {
  token: string;
}

@injectable()
export class GenerateTokensService implements IService {
  constructor(
    @inject('AccessTokenProvider')
    private accessTokenProvider: IAccessTokenProvider,
  ) {}

  public async execute(data: IUserTokenDTO): Promise<IResponse> {
    const token = await this.accessTokenProvider.generateAccessToken(data);
    return {
      token,
    };
  }
}
