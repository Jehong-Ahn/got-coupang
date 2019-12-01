import assert from 'assert';
import nock from 'nock';
import dotenv from 'dotenv';
import createClient from '../src';

describe('A Client', () => {
  it('should be initiated with options', async () => {
    const client = createClient({
      vendorId: '1',
      accessKey: '2',
      secretKey: '3',
    });

    nock('https://api-gateway.coupang.com')
      .get('/')
      .query(true)
      .reply(
        200,
        uri => ({ uri }),
        { authorization: req => req.headers.authorization }
      );

    const resp = await client('', {
      searchParams: { vendorId: true }
    });

    assert.deepStrictEqual(resp.body.uri, '/?vendorId=1');
    assert.notStrictEqual(resp.headers.authorization.indexOf('access-key=2,'), -1);
  });

  it('should be initiated with env vars', async () => {
    process.env = {
      ...process.env,
      ...dotenv.parse(Buffer.from(`
        COUPANG_VENDOR_ID=1
        COUPANG_ACCESS_KEY=2
        COUPANG_SECRET_KEY=3
      `))
    };

    const client = createClient();

    nock('https://api-gateway.coupang.com')
      .get('/')
      .query(true)
      .reply(
        200,
        uri => ({ uri }),
        { authorization: req => req.headers.authorization }
      );

    const resp = await client('', {
      searchParams: { vendorId: true }
    });

    assert.deepStrictEqual(resp.body.uri, '/?vendorId=1');
    assert.notStrictEqual(resp.headers.authorization.indexOf('access-key=2,'), -1);
  });
});
