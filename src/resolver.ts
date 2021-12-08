import * as github from '@actions/github';
import { Context } from '@actions/github/lib/context';

enum SupportedEvents {
  IssueComment = 'issue_comment',
  PullRequest = 'pull_request',
  PullRequestReview = 'pull_request_review',
}

export const resolveRefs = async (token: string) => {
  const context = github.context;

  switch (context.eventName) {
    case SupportedEvents.IssueComment: {
      const prUrl = context.payload.issue?.pull_request.url;
      const octokit = github.getOctokit(token);

      const prDetails = await octokit.request(`GET ${prUrl}`);

      const status = prDetails.status;
      const headRef = prDetails.data.head.ref;
      const baseRef = prDetails.data.base.ref;

      return { status, headRef, baseRef };
    }

    case SupportedEvents.PullRequest:
    case SupportedEvents.PullRequestReview: {
      const headRef = context.payload.pull_request?.head.ref;
      const baseRef = context.payload.pull_request?.base.ref;
      return { headRef, baseRef };
    }
  }

  throw new Error(`Unsupported event type: ${context.eventName}`);
};
