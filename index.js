const core = require('@actions/core');

const resolver = require('./src/resolver');

(async () => {
  try {
    const githubToken = core.getInput('token');

    const { headRef, baseRef } = await resolver.resolveRefs(githubToken);

    console.log(`headRef this: ${headRef}`);
    console.log(`headRef  env: ${process.env.GITHUB_HEAD_REF}`);

    core.setOutput('base_ref', baseRef);
    core.setOutput('head_ref', headRef);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
