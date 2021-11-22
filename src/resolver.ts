const github = require('@actions/github');

const ISSUE_TYPES = ['issue_comment'];

const getPrUrl = (payload: any) => {
  try {
    if (ISSUE_TYPES.includes(payload.event_name)) {
      return github.context.payload.issue.pull_request.url;
    }

    return github.context.payload.pull_request.url;
  } catch {
    return null;
  }
};

const getFallbackRefs = () => {
  return {
    status: null,
    headRef: process.env.GITHUB_HEAD_REF,
    baseRef: process.env.GITHUB_BASE_REF,
  };
};

const resolveRefs = async (token: string) => {
  const prUrl = getPrUrl(github.context.payload);

  if (!prUrl) {
    return getFallbackRefs();
  }

  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const baseRef = prDetails.data.base.ref;

  return { status, headRef, baseRef };
};

module.exports = { resolveRefs };
