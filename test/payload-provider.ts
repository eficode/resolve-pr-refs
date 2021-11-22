class PayloadProvider {
  contextPayload: any;
  octokitPayload: { status: string; data: { head: { ref: string; }; base: { ref: string; }; }; };

  constructor() {
    this.contextPayload = {
      payload: {
        event_name: 'issue_comment',
        issue: { pull_request: { url: 'https://api.github.com/repos/not-existing/pr/pulls/1' } },
      },
    };
    this.octokitPayload = {
      status: '200',
      data: {
        head: { ref: 'refs/heads/pr' },
        base: { ref: 'refs/heads/main' },
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
  getBaseRef() { return this.octokitPayload.data.base.ref; }
}

module.exports = new PayloadProvider();
