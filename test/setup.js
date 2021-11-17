const mockPayload = require('./payload-provider');

if (!process.env.CI) {
  jest.mock('@actions/github', () => ({
    get context () {
      return mockPayload.contextPayload;
    },
    getOctokit () {
      return { request: () => mockPayload.octokitPayload };
    },
  }));
}
