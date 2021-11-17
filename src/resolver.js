const github = require('@actions/github');

const resolveRefs = async (token) => {
  const prUrl = github.context.payload.issue.pull_request.url;
  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const baseRef = prDetails.data.base.ref;

  return { status, headRef, baseRef };
};

module.exports = { resolveRefs };
