const assert = require('assert');
const app = require('../../src/app');

describe('\'shorturls\' service', () => {
  it('registered the service', () => {
    const service = app.service('shorturls');

    assert.ok(service, 'Registered the service');
  });
});
