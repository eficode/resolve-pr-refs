const github = require('@actions/github');

const ISSUE_TYPES = ['issue_comment'];

const getPrUrl = (context) => {
  if (ISSUE_TYPES.includes(context.eventName)) {
    return context.payload.issue.pull_request.url;
  }

  throw new Error(`Unsupported event type: ${context.eventName}`);
};

const resolveRefs = async (token) => {
  const prUrl = getPrUrl(github.context);
  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const baseRef = prDetails.data.base.ref;

  return { status, headRef, baseRef };
};

module.exports = { resolveRefs };
