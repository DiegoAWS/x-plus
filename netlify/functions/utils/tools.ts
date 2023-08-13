

export const printError = (err) => {
    const error = err?.response?.data ? {
        data: err?.response?.data,
        errors: err?.response?.data?.errors,
        headersResponse: err?.response?.headers,
        HeadersRequest: err?.request?.headers,
        request: err?.request.data,
    } : err;

    console.error(error);
}

export const createResponse = (statusCode: number, body: object) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(body)
    }
}