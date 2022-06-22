import * as github from '@actions/github';

const ISSUE_TYPES = ['issue_comment'];

const getPrUrl = (context: any) => {
  if (ISSUE_TYPES.includes(context.eventName)) {
    return context.payload.issue.pull_request.url;
  }

  throw new Error(`Unsupported event type: ${context.eventName}`);
};

export const resolveRefs = async (token: string) => {
  const prUrl = getPrUrl(github.context);
  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const headSha = prDetails.data.head.sha;
  const baseRef = prDetails.data.base.sha;
  const baseSha = prDetails.data.base.ref;

  return { status, headRef, headSha, baseRef, baseSha };
};
