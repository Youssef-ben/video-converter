export type LoginDto = {
  passphrase: string;
};

export type LoginResponseDto = {
  accessToken: string;
};

export type SavedAccessTokens = {
  id: string;
  expiresAt: Date;
};
