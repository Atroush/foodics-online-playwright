import fs from 'fs';
import path from 'path';

export class JsonHelper {
  private jsonObject: Record<string, any>;
  filePath: string;
  constructor() {
    this.jsonObject = {};
  }

  /**
   * Reads and parses a JSON file asynchronously and stores the parsed data.
   * @param filePath - Path to the JSON file.
   */
  public async readJsonFile(pathF: string): Promise<void> {
   this.filePath=pathF;
    try {
      const resolvedPath = path.resolve(this.filePath);
      console.log(`Reading JSON file from: ${resolvedPath}`);

      // Read the JSON file asynchronously
      const data = await fs.promises.readFile(resolvedPath, 'utf8');

      // Parse the JSON data and store it
      this.jsonObject = JSON.parse(data);
      console.log('JSON data parsed successfully.');
    } catch (error) {
      console.error(`Error reading or parsing the file: ${this.filePath}.`, error.message);
      throw error; // Rethrow the error to handle it further in the caller
    }
  }

  /**
   * Returns the entire parsed JSON object.
   * @returns The entire JSON object as a plain JS object.
   */
  public getJsonObject(): Record<string, any> {
    return this.jsonObject;
  }

  /**
   * Retrieves a value from the JSON object by key.
   * @param key - Key or key path (dot-separated for nested objects).
   * @returns The value corresponding to the key, or undefined if not found.
   */
  public getValue(key: string): any {
    return this.getValueByPath(this.jsonObject, key);
  }

  private getValueByPath(obj: Record<string, any>, keyPath: string): any {
    const keys = keyPath.split('.');
    let result = obj;

    for (const key of keys) {
      if (result && key in result) {
        result = result[key];
      } else {
        return undefined; // Return undefined if the key is not found
      }
    }

    return result;
  }
  /**
    * Retrieves a value from the JSON object by object name and key.
    * @param objectName - The top-level JSON object name (e.g., "employeeData").
    * @param key - The key inside the object to retrieve.
    * @returns The value corresponding to the key, or undefined if not found.
    */
  public getValueFromObject(objectName: string, key: string): any {
    const object = this.jsonObject[objectName];
    if (object && key in object) {
      return object[key];
    }
    return undefined; // Return undefined if the object or key is not found
  }
  /**
     * Retrieves an entire JSON object by its name.
     * @param objectName - The top-level JSON object name (e.g., "employeeData").
     * @returns The entire JSON object for the specified name, or undefined if not found.
     */
  public getObjectByName(objectName: string) {
    const object = this.jsonObject[objectName];
    if (object) {
      return object;
    }
    console.warn(`Object with name "${objectName}" not found in the JSON.`);
    return undefined; // Return undefined if the object is not found
  }

  /**
   * Retrieves a list of keys in the JSON object.
   * @returns An array of keys in the JSON object.
   */
  public getAllKeys(): string[] {
    return Object.keys(this.jsonObject);
  }
  public async updateAttribute(objectName: string, key: string, value: any): Promise<void> {
    const object = this.jsonObject[objectName];
    if (object) {
      object[key] = value;
      await this.saveJsonFile(this.filePath);  // Save the updated JSON back to the file
      console.log(`Updated ${key} in ${objectName} to ${value}`);
    } else {
      console.warn(`Object with name "${objectName}" not found in the JSON.`);
    }
  }
  private async saveJsonFile(filePath: string): Promise<void> {
    try {
      const resolvedPath = path.resolve(filePath);
      console.log(`Saving JSON file to: ${resolvedPath}`);

      // Write the updated JSON object back to the file
      await fs.promises.writeFile(resolvedPath, JSON.stringify(this.jsonObject, null, 2), 'utf-8');
      console.log('JSON data saved successfully.');
    } catch (error) {
      console.error(`Error saving the file: ${filePath}.`, error.message);
      throw error; // Rethrow the error to handle it further in the caller
    }
  }

}
