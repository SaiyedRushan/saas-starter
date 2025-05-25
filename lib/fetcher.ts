export const fetcher = (...args: Parameters<typeof fetch>): Promise<any> => fetch(...args).then((res) => res.json())
