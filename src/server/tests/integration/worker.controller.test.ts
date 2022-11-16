/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */

import httpServer from '../../src/startup';
import { expect } from 'chai';
import supertest from 'supertest';
import { runLogin, workerFetchObject } from './test.helpers';
import { YoutubeVideoDetails } from '../../src/models/vytc/video_details.model';
import { ApiResponse } from '../../src/models/response/api.response';
import { ErrorApiResponse } from '../../src/models/response/error.api.response';

describe('Worker endpoints', function () {
  // Define the request to be used
  let request: supertest.SuperAgentTest;

  let accessToken = 'Bearer';

  const URLS = {
    fetch: '/worker/fetch',
  };

  before(async function () {
    request = supertest.agent(httpServer);

    const data: any = await runLogin(request);

    expect(data.result).to.not.be.empty;
    expect(data.code).to.be.equal(200);
    expect(data.result.access_token).to.not.be.empty;

    accessToken = `Bearer ${data.result.access_token}`;
  });

  it('Fetch - Youtube video details', async function () {
    const res = await request.get(URLS.fetch).set({ Authorization: accessToken }).query({ videoUrl: 'https://www.youtube.com/watch?v=2N4SjqaKPA8' }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ApiResponse<YoutubeVideoDetails> = res.body;
    expect(data.code).to.equal(200);
    expect(data.result).to.not.be.empty;

    expect(JSON.stringify(data.result)).to.equal(JSON.stringify(workerFetchObject));
  });

  it('Fetch - Youtube video details - Parameter required', async function () {
    const res = await request.get(URLS.fetch).set({ Authorization: accessToken }).query({ invalidParam: 'https://www.youtube.com/watch?v=2N4SjqaKPA8' }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);
    expect(data.type).to.equal('api.err.validation');
  });

  it('Fetch - Youtube video details - Invalid Youtube URL', async function () {
    const res = await request.get(URLS.fetch).set({ Authorization: accessToken }).query({ videoUrl: 'invalid-url' }).send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);
    expect(data.type).to.equal('api.err.worker.invalid_url');
  });
});
