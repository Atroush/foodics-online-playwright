import PropertiesReader from 'properties-reader';
import path from 'path';

export class ConfigReader {
  private properties: any;

  constructor(filePath: string) {
    const resolvedPath = path.resolve(filePath);
    this.properties = PropertiesReader(resolvedPath);
  }

  get(key: string): string {
    const value = this.properties.get(key);
    if (value === null || value === undefined) {
      throw new Error(`Key "${key}" not found in properties file`);
    }
    return value.toString();
  }
}
