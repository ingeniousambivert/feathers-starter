const assert = require('assert');
const app = require('../../src/app');

describe('\'invites\' service', () => {
  it('registered the service', () => {
    const service = app.service('invites');

    assert.ok(service, 'Registered the service');
  });
});
