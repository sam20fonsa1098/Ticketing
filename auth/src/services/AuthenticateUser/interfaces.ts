import { User } from '../../infra/typeorm/entities/User';
import { IResponse as ITokensResponse } from '../GenerateTokens/interfaces';

interface IResponse extends ITokensResponse {
  user: User;
}

export { IResponse };