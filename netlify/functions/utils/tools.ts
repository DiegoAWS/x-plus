

export const printError = (err) => {
    const error = err?.response?.data ? {
        data: err?.response?.data,
        headersResponse: err?.response?.headers,
        HeadersRequest: err?.request?.headers,
        request: err?.request,
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