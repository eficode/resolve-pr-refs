import mockPayload from './payload-provider';

jest.mock('@actions/github', () => ({
  get context () {
    return mockPayload.contextPayload;
  },
  getOctokit () {
    return { request: () => mockPayload.octokitPayload };
  },
}));
