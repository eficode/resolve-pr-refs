import * as core from '@actions/core';

import { resolveRefs } from './src/resolver';

(async () => {
  try {
    const githubToken = core.getInput('token');

    const { headRef, baseRef } = await resolveRefs(githubToken);

    core.setOutput('base_ref', baseRef);
    core.setOutput('head_ref', headRef);
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();
