import urls from '@/config/routes.json';
const knownUrls = new Map(Object.entries(urls));

/**
 * Helper function for resolving url with it's name.
 * @param  resourceName Name of the resource to be resolved.
 * @param  queryParams Optional query parameters.
 */
export function resolveUrl(
  resourceName: string,
  queryParams: { [key: string]: string },
): URL | null {
  if (!knownUrls.has(resourceName)) {
    return undefined;
  }
  const searchParams = queryParams ? '?' + new URLSearchParams(Object.entries(queryParams)) : '';
  return new URL(location.origin + knownUrls.get(resourceName) + searchParams);
}
