/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import supertest from 'supertest';
import { ApiResponse } from '../../src/models/response/api.response';
import { ErrorApiResponse } from '../../src/models/response/error.api.response';
import { LoginDto } from '../../src/models/security/security.dto.model';

type TestLoginResponseDto = {
  access_token: string;
};

export const workerFetchObject = {
  id: '2N4SjqaKPA8',
  title: 'Nirvana - Enine (No Copyright Music)  Release Preview',
  duration: '00:01:01',
  link: 'https://www.youtube.com/watch?v=2N4SjqaKPA8',
  thumbnail: {
    url: 'https://i.ytimg.com/vi_webp/2N4SjqaKPA8/maxresdefault.webp',
    width: 1920,
    height: 1080,
  },
  extensions: { audio: 'webm', video: 'mp4' },
};

export const runLogin = async (request: supertest.SuperAgentTest, passphrase?: string): Promise<ApiResponse<TestLoginResponseDto> | ErrorApiResponse> => {
  // Prepare
  const login: LoginDto = {
    passphrase: passphrase || 'api&test@',
  };

  // Execute
  const res = await request.post('/security/login').send(login);

  // Assert
  expect(res.body).to.be.an('object');
  expect(res.body).to.not.be.empty;

  return res.body;
};
