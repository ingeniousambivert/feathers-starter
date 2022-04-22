const assert = require('assert');
const app = require('../../src/app');

describe('\'visits\' service', () => {
  it('registered the service', () => {
    const service = app.service('visits');

    assert.ok(service, 'Registered the service');
  });
});
