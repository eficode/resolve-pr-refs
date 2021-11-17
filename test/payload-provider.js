class PayloadProvider {
  constructor() {
    this.contextPayload = {
      payload: { issue: { pull_request: { url: '' } } },
    };
    this.octokitPayload = {
      status: 'example status',
      data: {
        head: { ref: process.env.GITHUB_HEAD_REF || 'test/head/ref' },
        base: { ref: process.env.GITHUB_BASE_REF || 'test/base/ref' },
      },
    };
  }

  setContextPayload(payload) {
    this.contextPayload = { ...this.contextPayload, ...payload };
  }

  setOctokitPayload(payload) {
    this.octokitPayload = { ...this.octokitPayload, ...payload };
  }

  getHeadRef = () => this.octokitPayload.data.head.ref;
  getBaseRef = () => this.octokitPayload.data.base.ref;
}

module.exports = new PayloadProvider();
