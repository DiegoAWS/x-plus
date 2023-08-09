export const printError = (err) => {
    const error = err?.response?.data ? {
        data: err?.response?.data,
        headers: err?.response?.headers
    } : err;

    console.error(error);
}