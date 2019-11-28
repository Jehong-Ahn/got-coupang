import assert from 'assert';
import { setVendorId } from '../src/handlers';

describe('A Function setVendorId', () => {
  it('should replace the vendor id on the path.', () => {
    const opts = {
      account: { vendorId: 1234 },
      path: encodeURI('hello/{vendorId}/world'),
    };
    setVendorId(opts);
    assert.strictEqual(opts.path, 'hello/1234/world');
  });

  it('should replace the vendor id on other fields.', () => {
    const opts = {
      account: { vendorId: 1234 },
      path: encodeURI('hello/{vendorId}/world'),
      searchParams: { vendorId: true },
      json: { vendorId: true },
    };
    setVendorId(opts);
    assert.strictEqual(opts.path, 'hello/1234/world');
    assert.strictEqual(opts.searchParams.vendorId, 1234);
    assert.strictEqual(opts.json.vendorId, 1234);
  });
});
