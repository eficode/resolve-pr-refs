const resolver = require('../src/resolver');

const mockPayload = require('./payload-provider');

describe('resolveRefs', () => {
  const token = process.env.GITHUB_TOKEN || "TEST TOKEN";

  it(`should return head_ref: ${mockPayload.getHeadRef()}`, async () => {
    const { headRef } = await resolver.resolveRefs(token);

    expect(headRef).toEqual(mockPayload.octokitPayload.data.head.ref);
  });

  it(`should return base_ref: ${mockPayload.getBaseRef()}`, async () => {
    const { baseRef } = await resolver.resolveRefs(token);

    expect(baseRef).toEqual(mockPayload.octokitPayload.data.base.ref);
  });
});
