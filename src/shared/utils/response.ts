enum ProcessOptions {
    SUCCESS = 'success',
    FAILED = 'failed'
}

interface SuccessResponse<T> {
    process: ProcessOptions.SUCCESS
    body: T
}

interface FailedResponse {
    process: ProcessOptions.FAILED
    body: string | undefined
}

type Response<T> = (SuccessResponse<T> | FailedResponse) & {
    status_code: number
}

const normalizationResponse = {
    ok: <T>(result: T): Response<T> => {
        return {
            process: ProcessOptions.SUCCESS,
            status_code: 200,
            body: result,
        }
    },
    badRequest: <T>(msg: string | undefined): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 400,
            body: msg,
        }
    },
    unauthorized: <T>(): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 401,
            body: 'Unauthorized',
        }
    },
    paymentRequired: <T>(): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 402,
            body: 'Payment required',
        }
    },
    forbidden: <T>(): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 403,
            body: 'Access to this resource is blocked',
        }
    },
    notFound: <T>(resource?: string): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 404,
            body: resource !== undefined
                ? `${resource} not found`
                : 'Resource not found',
        }
    },
    conflict: <T>(msg: string | undefined): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 409,
            body: msg,
        }
    },
    serverError: <T>(msg: string): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code: 500,
            body: msg,
        }
    },
    customError: <T>(
        status_code: number,
        body: string
    ): Response<T> => {
        return {
            process: ProcessOptions.FAILED,
            status_code,
            body,
        }
    },
}

export { ProcessOptions, Response, normalizationResponse }
