import urls from '@/config/routes.json';
const knownUrls = new Map(Object.entries(urls));

/**
 * Helper function for resolving url with it's name.
 * @param {string} resourceName Name of the resource to be resolved.
 * @param {Object} queryParams Optional query parameters.
 * @throws {TypeError} Arguments have wrong type.
 * @returns {URL|null} Resolved url or null if it's not exists.
 */
export const resolveUrl = (resourceName, queryParams) => {
  if (!(typeof resourceName === 'string')) {
    throw TypeError('resourseName must be a string');
  }
  if (queryParams && Object.prototype.toString.call(queryParams) !== '[object Object]') {
    throw TypeError('queryParams must be a simple object');
  }
  if (!knownUrls.has(resourceName)) {
    return null;
  }
  const searchParams = queryParams ? '?' + new URLSearchParams(queryParams) : '';
  return new URL(location.origin + knownUrls.get(resourceName) + searchParams);
};
