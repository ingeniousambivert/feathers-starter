const assert = require('assert');
const app = require('../../src/app');

describe('\'shlink\' service', () => {
  it('registered the service', () => {
    const service = app.service('shlink');

    assert.ok(service, 'Registered the service');
  });
});
