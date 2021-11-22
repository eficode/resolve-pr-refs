const mockPayload = require('./payload-provider');

if (!process.env.GITHUB_HEAD_REF || !process.env.GITHUB_BASE_REF) {
  jest.mock('@actions/github', () => ({
    get context () {
      return mockPayload.contextPayload;
    },
    getOctokit () {
      return { request: () => mockPayload.octokitPayload };
    },
  }));
}
