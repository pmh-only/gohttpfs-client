export function parseEndpoint (baseURL: string, endpoint: string): string {
  return new URL(endpoint, baseURL).toString()
}
