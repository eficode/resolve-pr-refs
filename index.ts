import * as core from '@actions/core';

import { resolveRefs } from './src/resolver';

(async () => {
  try {
    const githubToken = core.getInput('token');

    const { headRef, headSha, baseRef, baseSha } = await resolveRefs(githubToken);

    core.setOutput('base_ref', baseRef);
    core.setOutput('base_sha', baseSha);
    core.setOutput('head_ref', headRef);
    core.setOutput('head_sha', headSha);
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();
