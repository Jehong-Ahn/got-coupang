/* eslint-disable no-param-reassign */
const moment = require('moment');
const crypto = require('crypto');

const setVendorId = (opts) => {
  const { vendorId } = opts.account;
  opts.path = opts.path.replace('%7BvendorId%7D', vendorId);
  ['searchParams', 'json'].forEach((key) => {
    if (typeof opts[key] === 'object' && opts[key].vendorId) {
      opts[key].vendorId = vendorId;
    }
  });
};

const signHmac = (opts) => {
  const { accessKey, secretKey } = opts.account;

  const now = moment();
  const datetime = `${now.format('YYMMDD')}T${now.format('HHmmss')}Z`;

  const payload = datetime
    + opts.method
    + opts.path.replace('?', '');

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(payload)
    .digest('hex');

  opts.headers.Authorization = 'CEA algorithm=HmacSHA256'
    + `, access-key=${accessKey}`
    + `, signed-date=${datetime}`
    + `, signature=${signature}`;
};

const onError = error => ({
  request: {
    method: error.options.method,
    path: error.options.path,
    body: error.options.body,
    headers: error.options.headers,
  },
  response: {
    statusCode: error.response.statusCode,
    body: error.response.body,
    retryCount: error.response.retryCount,
  },
  error: error.toString()
});

export { setVendorId, signHmac, onError };
