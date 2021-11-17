const resolver = require('../src/resolver');

const contextPayload = {
  payload: { issue: { pull_request: { url: '' } } },
};

const octokitPayload = {
  status: 'example status',
  data: {
    base: { ref: 'test base ref' },
    head: { ref: 'test head ref' },
  },
};

jest.mock('@actions/github', () => ({
  get context () {
    return contextPayload;
  },
  getOctokit () {
    return { request: () => octokitPayload };
  },
}));

describe('resolveRefs', () => {
  const token = "FAKETOKEN";

  it('should return base_ref', async () => {
    const { baseRef } = await resolver.resolveRefs(token);

    expect(baseRef).toEqual('test base ref');
  });
});
