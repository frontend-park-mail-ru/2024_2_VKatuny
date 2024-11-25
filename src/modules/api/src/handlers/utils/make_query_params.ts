/** Make query parameters with given object. If some parameter is undefined,
 * it will be excluded
 * @param queryObject An object whose key and values will be transformed into URLSearchParams
 * @returns URLSearchParams containing only defined parameters
 */
export function makeQueryParams(queryObject: { [key: string]: unknown }): URLSearchParams {
  const definedQueries = Object.entries(queryObject).reduce(
    (definedQueries: { [key: string]: string }, [name, value]) => {
      if (value === undefined) {
        return definedQueries;
      }
      definedQueries[name] = String(value);
      return definedQueries;
    },
    {},
  );
  return new URLSearchParams(definedQueries);
}
