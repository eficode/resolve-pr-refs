const github = require('@actions/github');

const ISSUE_TYPES = ['issue_comment'];

const getPrUrl = (payload) => {
  if (ISSUE_TYPES.includes(payload.event_name)) {
    return github.context.payload.issue.pull_request.url;
  }

  throw new Error(`Unsupported event type: ${payload.event_name}`);
};

const resolveRefs = async (token) => {
  const prUrl = getPrUrl(github.context.payload);
  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const baseRef = prDetails.data.base.ref;

  return { status, headRef, baseRef };
};

module.exports = { resolveRefs };
