/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */

import httpServer from '../../src/startup';
import { expect } from 'chai';
import supertest from 'supertest';
import { ApiResponse } from '../../src/models/response/api.response';
import { runLogin } from './test.helpers';
import { ErrorApiResponse } from '../../src/models/response/error.api.response';

describe('Security endpoints', function () {
  // Define the request to be used
  let request: supertest.SuperAgentTest;

  let accessToken = 'Bearer';

  const URLS = {
    refresh: '/security/refresh',
    logout: '/security/logout',
  };

  before(function () {
    request = supertest.agent(httpServer);
  });

  it('Login', async function () {
    const data: any = await runLogin(request);

    expect(data.result).to.not.be.empty;
    expect(data.code).to.be.equal(200);
    expect(data.result.access_token).to.not.be.empty;

    accessToken = `Bearer ${data.result.access_token}`;
  });

  it('Login - Passphrase - Invalid', async function () {
    const data = (await runLogin(request, 'invalid_passphrase')) as ErrorApiResponse;

    expect(data.errors).to.not.be.empty;
    expect(data.code).to.be.equal(400);
    expect(data.type).to.equal('api.err.security.invalid_passphrase');
  });

  it('Refresh', async function () {
    // Prepare
    const res = await request.get(URLS.refresh).set({ Authorization: accessToken }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<any> = res.body;
    expect(data.code).to.be.equal(200);

    accessToken = `Bearer ${data.result.access_token}`;
    expect(accessToken).to.include(data.result.access_token);
  });

  it('Logout', async function () {
    // Prepare
    const res = await request.delete(URLS.logout).set({ Authorization: accessToken }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<any> = res.body;
    expect(data.code).to.be.equal(200);
  });

  it('UnAuthorized', async function () {
    const res = await request.get(URLS.refresh).set({ Authorization: accessToken }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<any> = res.body;
    expect(data.code).to.be.equal(401);
  });

  it('UnAuthorized - No Access Token', async function () {
    const res = await request.get(URLS.refresh).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<any> = res.body;
    expect(data.code).to.be.equal(401);
  });
});
