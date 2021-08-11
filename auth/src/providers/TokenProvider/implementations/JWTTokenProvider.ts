import { authConfig } from '../../../config/auth';
import { sign, verify } from 'jsonwebtoken';
import { IAccessTokenProvider } from "../models/IAccessTokensProvider";
import { IUserTokenDTO } from '../../../dtos/IUserTokenDTO';
import { UnauthorizedError } from '@sam20fonsa1098tickets/common';



export class JWTTokenProvider implements IAccessTokenProvider {
  generateAccessToken = async (data: IUserTokenDTO): Promise<string> => {
    const token = sign({ ...data }, authConfig.jwt.secret, {
      subject: data.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return token;
  }

  validateAccessToken = (token: string): IUserTokenDTO => {
    try {
      const payload = verify(token, authConfig.jwt.secret) as IUserTokenDTO;
      return payload
    } catch {
      throw new UnauthorizedError('Invalid JWT token', 401);
    }
  }

  getAccessToken = (cookie: string): string => {
    let [, token] = cookie.split('jwt=');
    [token, ] = token.split(';')
    return token
  }
}