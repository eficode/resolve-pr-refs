const github = require('@actions/github');

const mockPayload = require('./payload-provider');

if (!github.context.payload.issue) {
  jest.mock('@actions/github', () => ({
    get context () {
      return mockPayload.contextPayload;
    },
    getOctokit () {
      return { request: () => mockPayload.octokitPayload };
    },
  }));
}
