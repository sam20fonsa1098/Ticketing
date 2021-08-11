export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: '15min',
    expiresInSeconds: 15 * 60,
  },
  refreshToken: {
    expiresIn: 30,
    bytes: 24,
  }
};
