import { IValidator } from 'validators/models/IValidator';

import { User } from '@infra/typeorm/entities/User';
import { UnauthorizedError } from '@sam20fonsa1098tickets/common';

class CheckUserExistsValidator implements IValidator {
  public validate(data: User): void {
    if (!data) {
      throw new UnauthorizedError('Incorrect email/password combination');
    }
  }
}

export { CheckUserExistsValidator };
