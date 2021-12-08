import * as github from '@actions/github';

const ISSUE_TYPES = ['issue_comment'];

const getPrUrl = (context: any) => {
  if (ISSUE_TYPES.includes(context.eventName)) {
    return context.payload.issue.pull_request.url;
  }

  throw new Error(`Unsupported event type: ${context.eventName}`);
};

export const resolveRefs = async (token: string) => {
  if (github.context.eventName == 'pull_request_review') {
    let headRef = github.context.payload.pull_request?.head.ref;
    let baseRef = github.context.payload.pull_request?.base.ref;
    return { headRef, baseRef };
  }

  const prUrl = getPrUrl(github.context);
  const octokit = github.getOctokit(token);

  const prDetails = await octokit.request(`GET ${prUrl}`);

  const status = prDetails.status;
  const headRef = prDetails.data.head.ref;
  const baseRef = prDetails.data.base.ref;

  return { status, headRef, baseRef };
};
