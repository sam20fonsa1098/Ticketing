export interface IRefreshTokenProvider {
  generateRefreshToken(): Promise<{
    refreshToken: string;
    expiresRefreshToken: number;
  }>;
}
