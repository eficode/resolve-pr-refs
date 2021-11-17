class PayloadProvider {
  constructor() {
    this.contextPayload = {
      payload: { issue: { pull_request: { url: '' } } }
    };
    this.octokitPayload = {
      status: 'example status',
      data: {
        base: { ref: 'test base ref' },
        head: { ref: 'test head ref' },
      },
    };
  }

  setContextPayload(payload) {
    this.contextPayload = { ...this.contextPayload, ...payload };
  }

  setOctokitPayload(payload) {
    this.octokitPayload = { ...this.octokitPayload, ...payload };
  }
}

module.exports = new PayloadProvider();
