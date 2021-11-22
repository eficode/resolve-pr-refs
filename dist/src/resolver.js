"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const github = require('@actions/github');
const ISSUE_TYPES = ['issue_comment'];
const getPrUrl = (payload) => {
    try {
        if (ISSUE_TYPES.includes(payload.event_name)) {
            return github.context.payload.issue.pull_request.url;
        }
        return github.context.payload.pull_request.url;
    }
    catch (_a) {
        return null;
    }
};
const getFallbackRefs = () => {
    return {
        status: null,
        headRef: process.env.GITHUB_HEAD_REF,
        baseRef: process.env.GITHUB_BASE_REF,
    };
};
const resolveRefs = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const prUrl = getPrUrl(github.context.payload);
    if (!prUrl) {
        return getFallbackRefs();
    }
    const octokit = github.getOctokit(token);
    const prDetails = yield octokit.request(`GET ${prUrl}`);
    const status = prDetails.status;
    const headRef = prDetails.data.head.ref;
    const baseRef = prDetails.data.base.ref;
    return { status, headRef, baseRef };
});
module.exports = { resolveRefs };
