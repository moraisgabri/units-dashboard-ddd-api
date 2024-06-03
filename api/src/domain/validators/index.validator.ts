export abstract class MainValidator {
  static getMissingRequiredKeys(
    obj: Record<string, any>,
    requiredKeys: string[]
  ): string[] {
    const missingKeys: string[] = [];

    for (const key of requiredKeys) {
      if (!(key in obj)) {
        missingKeys.push(key);
      }
    }

    return missingKeys;
  }
}
