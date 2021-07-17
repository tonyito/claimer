import { isNil } from "lodash";

export default class ObjectHelpers {
  public static findMissingKeys(
    obj: Record<string, any>,
    keys: string[]
  ): string[] {
    return keys.filter((key) => isNil(obj[key]));
  }
}

export const { findMissingKeys } = ObjectHelpers;
