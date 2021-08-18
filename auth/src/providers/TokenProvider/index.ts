import { container } from 'tsyringe';

import { JWTTokenProvider } from './implementations/JWTTokenProvider';
import { IAccessTokenProvider } from './models/IAccessTokensProvider';

container.registerSingleton<IAccessTokenProvider>(
  'AccessTokenProvider',
  JWTTokenProvider,
);
