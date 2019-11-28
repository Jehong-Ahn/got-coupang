import assert from 'assert';
import sinon from 'sinon';
import { signHmac } from '../src/handlers';

describe('The function signHmac', () => {
  it('should sign "hello, world"', () => {
    const opts = {
      account: {
        accessKey: 'accessKey',
        secretKey: 'secretKey',
      },
      headers: {},
      method: 'get',
      path: 'hello/world'
    };
    sinon.useFakeTimers(new Date('2019-07-07'));
    signHmac(opts);
    assert.strictEqual(
      opts.headers.Authorization,
      `CEA algorithm=HmacSHA256, access-key=${opts.account.accessKey}, signed-date=190707T090000Z, signature=5984d632b451ad525e8956c9a2bfaf4bd0e3501b09d12328352c5db3d20c14c7`
    );
  });
});
