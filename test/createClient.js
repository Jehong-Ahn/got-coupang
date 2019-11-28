import assert from 'assert';
import createClient from '../src';

describe('A Client', () => {
  it('should be initiated with options', () => {
    const client = createClient({
      vendorId: 1,
      accessKey: 2,
      secretKey: 3,
    });
    assert.deepStrictEqual(
      client.defaults.options.account,
      {
        vendorId: 1,
        accessKey: 2,
        secretKey: 3,
      }
    );
  });

  it('should be initiated with env vars', () => {
    const client = createClient();
    assert.deepStrictEqual(
      client.defaults.options.account,
      {
        vendorId: process.env.COUPANG_VENDOR_ID,
        accessKey: process.env.COUPANG_ACCESS_KEY,
        secretKey: process.env.COUPANG_SECRET_KEY,
      }
    );
  });
});
