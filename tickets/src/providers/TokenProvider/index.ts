import { container } from 'tsyringe';

import { IAccessTokenProvider } from './models/IAccessTokensProvider';
import { JWTTokenProvider } from './implementations/JWTTokenProvider';

container.registerSingleton<IAccessTokenProvider>('AccessTokenProvider', JWTTokenProvider);
