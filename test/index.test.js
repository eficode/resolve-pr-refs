const resolver = require('../src/resolver');

const mockPayload = require('./payload-provider');

describe('resolveRefs', () => {
  const token = process.env.GITHUB_TOKEN || "TEST TOKEN";

  it('should return base_ref', async () => {
    // mockPayload.setOctokitPayload({ data: { base: { ref: 'test  ref' } } });

    const { baseRef } = await resolver.resolveRefs(token);

    expect(baseRef).toEqual(mockPayload.octokitPayload.data.base.ref);
  });

  it('should return head_ref', async () => {
    const { headRef } = await resolver.resolveRefs(token);

    expect(headRef).toEqual('test head ref');
  });
});
