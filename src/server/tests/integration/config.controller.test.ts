/* eslint-disable no-unused-expressions */
import httpServer from '../../src/startup';
import { expect } from 'chai';
import request from 'supertest';
import { ApiResponse } from '../../src/models/response/api.response';
import { ConfigDTO } from '../../src/models/config/config.dto.model';
import ApiConfig from '../../src/config';
import { test } from 'mocha';

describe('Config endpoints', function () {
  const SERVER_BASE_URL = '/server';

  test('validate returned object', async function () {
    const res = await request(httpServer).get(SERVER_BASE_URL).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<ConfigDTO> = res.body;
    expect(data.result).to.not.be.empty;
    expect(data.code).to.be.equal(200);
  });

  test('validate configuration', async function () {
    const res = await request(httpServer).get(SERVER_BASE_URL).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<ConfigDTO> = res.body;
    expect(data.result.version).to.be.equal(ApiConfig.config.app.version);
  });
});
