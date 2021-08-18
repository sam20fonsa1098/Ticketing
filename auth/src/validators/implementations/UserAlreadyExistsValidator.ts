import { IValidator } from 'validators/models/IValidator';

import { User } from '@infra/typeorm/entities/User';
import { BadRequestError } from '@sam20fonsa1098tickets/common';

class UserAlreadyExistsValidator implements IValidator {
  public validate(data: User): void {
    if (data) {
      throw new BadRequestError('E-mail already used');
    }
  }
}

export { UserAlreadyExistsValidator };
