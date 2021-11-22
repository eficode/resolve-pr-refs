const core = require('@actions/core');

(async () => {
  try {
    const githubToken = core.getInput('token');

    const { headRef, baseRef } = await resolver.resolveRefs(githubToken);

    core.setOutput('base_ref', baseRef);
    core.setOutput('head_ref', headRef);
  } catch (error: any) {
    core.setFailed(error.message);
  }
})();
