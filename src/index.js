import createGotPaginate from 'got-paginate';
import { setVendorId, signHmac, onError } from './handlers';

export default function createClient(options = {}) {
  return createGotPaginate({
    ...{
      prefixUrl: 'https://api-gateway.coupang.com',
      hooks: {
        init: [setVendorId],
        beforeRequest: [signHmac],
        beforeError: [onError],
      },
      responseType: 'json',
      headers: {
        'user-agent': 'got-coupang',
      },
      account: {
        vendorId: process.env.COUPANG_VENDOR_ID || options.vendorId,
        accessKey: process.env.COUPANG_ACCESS_KEY || options.accessKey,
        secretKey: process.env.COUPANG_SECRET_KET || options.secretKey,
      },
    },
    ...options
  });
}
