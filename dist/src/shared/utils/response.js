"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizationResponse = exports.ProcessOptions = void 0;
var ProcessOptions;
(function (ProcessOptions) {
    ProcessOptions["SUCCESS"] = "success";
    ProcessOptions["FAILED"] = "failed";
})(ProcessOptions || (exports.ProcessOptions = ProcessOptions = {}));
const normalizationResponse = {
    ok: (result) => {
        return {
            process: ProcessOptions.SUCCESS,
            status_code: 200,
            body: result,
        };
    },
    badRequest: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 400,
            body: msg,
        };
    },
    unauthorized: () => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 401,
            body: 'Unauthorized',
        };
    },
    paymentRequired: () => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 402,
            body: 'Payment required',
        };
    },
    forbidden: () => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 403,
            body: 'Access to this resource is blocked',
        };
    },
    notFound: (resource) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 404,
            body: resource !== undefined
                ? `${resource} not found`
                : 'Resource not found',
        };
    },
    conflict: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 409,
            body: msg,
        };
    },
    serverError: (msg) => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 500,
            body: msg,
        };
    },
    customError: (status_code, body) => {
        return {
            process: ProcessOptions.FAILED,
            status_code,
            body,
        };
    },
};
exports.normalizationResponse = normalizationResponse;
