import urls from '@/config/routes.json';
const knownUrls = new Map(Object.entries(urls));

/**
 * Helper function for resolving url with it's name.
 * @param {string} resourceName Name of the resource to be resolved.
 * @param {Object} queryParams Optional query parameters.
 * @throws {TypeError} Arguments have wrong type.
 * @returns {URL|undefined} Resolved url or undefined if it's not exists.
 */
export const resolveUrl = (resourceName: string, queryParams: Object): URL | null => {
  if (!knownUrls.has(resourceName)) {
    return undefined;
  }
  const searchParams = queryParams ? '?' + new URLSearchParams(Object.entries(queryParams)) : '';
  return new URL(location.origin + knownUrls.get(resourceName) + searchParams);
};
