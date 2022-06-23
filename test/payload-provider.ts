class PayloadProvider {
  contextPayload: any;
  octokitPayload: { status: string; data: { head: { ref: string; sha: string; }; base: { ref: string; sha: string; }; }; };

  constructor() {
    this.contextPayload = {
      eventName: 'issue_comment',
      payload: {
        issue: { pull_request: { url: 'https://api.github.com/repos/not-existing/pr/pulls/1' } },
      },
    };
    this.octokitPayload = {
      status: '200',
      data: {
        head: { ref: 'refs/heads/pr', sha: 'shaHead' },
        base: { ref: 'refs/heads/main', sha: 'shaBase' },
      },
    };
  }

  setContextPayload(payload: any) {
    this.contextPayload = { ...this.contextPayload, ...payload };
  }

  setOctokitPayload(payload: any) {
    this.octokitPayload = { ...this.octokitPayload, ...payload };
  }

  getHeadRef() { return this.octokitPayload.data.head.ref; }
  getHeadSha() { return this.octokitPayload.data.head.sha; }
  getBaseRef() { return this.octokitPayload.data.base.ref; }
  getBaseSha() { return this.octokitPayload.data.base.sha; }
}

export default new PayloadProvider();
