import { hash, compare } from 'bcryptjs';

import { UnauthorizedError } from '@sam20fonsa1098tickets/common';

import { IHashProvider } from '../models/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<void> {
    const passwordMatched = compare(payload, hashed);
    if (!passwordMatched) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }
  }
}
