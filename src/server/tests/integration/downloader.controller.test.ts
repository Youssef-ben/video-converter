/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable no-unused-expressions */

import httpServer from '../../src/startup';
import { expect } from 'chai';
import supertest from 'supertest';
import { ErrorApiResponse } from '../../src/models/response/error.api.response';
import { Guid } from 'js-guid';

describe('Downloader endpoints', function () {
  // Define the request to be used
  let request: supertest.SuperAgentTest;

  const URLS = {
    download: '/downloader',
  };

  before(async function () {
    request = supertest.agent(httpServer);
  });

  it('Download - Invalid parameters', async function () {
    const res = await request
      .get(URLS.download)
      .query({
        key: '',
        title: '',
        type: '',
      })
      .send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);

    expect(JSON.stringify(data)).to.equal(
      JSON.stringify({
        code: 400,
        type: 'api.err.validation',
        errors: [
          { message: 'The field [key] is required!', field: 'key' },
          { message: 'The field [title] is required!', field: 'title' },
          { message: 'The field [type] is required!', field: 'type' },
        ],
      })
    );
  });

  it('Download - Invalid parameters - File type Not supported', async function () {
    const res = await request
      .get(URLS.download)
      .query({
        key: Guid.newGuid().toString(),
        title: 'title of the file',
        type: 'UnSupportedFileType',
      })
      .send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);

    expect(data.type).to.equal('api.err.unsupported_file_type');
  });

  it('Download - Invalid parameters - Invalid Guid for key', async function () {
    const res = await request
      .get(URLS.download)
      .query({
        key: '<invalid-key>',
        title: 'title of the file',
        type: 'audio',
      })
      .send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);

    expect(data.type).to.equal('api.err.invalid_file_key');
  });

  it('Download - Invalid parameters - File not found', async function () {
    const res = await request
      .get(URLS.download)
      .query({
        key: Guid.newGuid().toString(),
        title: 'title of the file',
        type: 'audio',
      })
      .send();

    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.empty;

    const data: ErrorApiResponse = res.body;
    expect(data.code).to.equal(400);

    expect(data.type).to.equal('api.err.video_not_found');
  });
});
