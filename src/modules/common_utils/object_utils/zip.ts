import { assertIfObject } from '@common_utils/asserts/asserts';

/**
 * Zip multiple objects into one object containing all their attributes. If
 * some of the objects have same attribute, value of the first object with
 * such an attribute will be taken.
 * Note that subobjects are not deepcopied.
 * @param objects The objects to be zipped
 */
export function zip(...objects: { [key: string]: any }[]): { [key: string]: any } {
  objects.forEach((potentialObject: unknown) => {
    assertIfObject(potentialObject);
  });

  return objects.reduce((zippedObject, currentObject) => {
    Object.entries(currentObject).forEach(([key, value]) => {
      if (!Object.prototype.hasOwnProperty.call(zippedObject, key)) {
        zippedObject[key] = value;
      }
    });
    return zippedObject;
  }, {});
}
