import crypto from 'crypto';
import moment from 'moment';

import { authConfig } from '../../../config/auth';
import { IRefreshTokenProvider } from '../models/IRefreshTokensProvider';

export class CryptoTokenProvider implements IRefreshTokenProvider {
  generateRefreshToken = async (): Promise<{
    refreshToken: string;
    expiresRefreshToken: number;
  }> => {
    const refreshToken = crypto
      .randomBytes(authConfig.refreshToken.bytes)
      .toString('hex');
    const expiresRefreshToken = moment()
      .add(authConfig.refreshToken.expiresIn, 'd')
      .unix();
    return { refreshToken, expiresRefreshToken };
  };
}
