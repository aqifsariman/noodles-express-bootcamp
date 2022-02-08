/* eslint-disable import/no-duplicates */
import { writeFile } from 'fs';

// We omit the write function above here for brevity.
import { readFile } from 'fs';

/**
 * Overwrite contents of the target JSON file
 * @param {string} filename - The name of the target JSON file
 * @param {object} content - The content to write to the file.
 * @returns undefined
 */
export function write(filename, jsonContentObj) {
  // Convert the data from JS Object to string
  const jsonContentStr = JSON.stringify(jsonContentObj);
  // Write JSON string to target file
  writeFile(filename, jsonContentStr, (writeErr) => {
    if (writeErr) {
      console.error('Writing error', writeErr);
    }
  });
}

/**
 * Read and log the contents of the target JSON file
 * @param {string} filename - The name of the target JSON file
 * @returns undefined
 */

export function read(filename, callback) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Read error', readErr);
      // Allow client to handle error in their own way
      callback(readErr, null);
      return;
    }

    // Convert file content to JS Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Call client callback on file content
    callback(null, jsonContentObj);
  };

  // Read content from DB
  readFile(filename, 'utf-8', handleFileRead);
}

// The following code builds on the imports, write and read functions above.
// We omit the above code here for brevity.

/**
 * Add a key-value pair to the JSON object in the relevant file
 * @param {string} filename - The name of the target JSON file
 * @param {string} key - The name of the key we wish to add
 * @param {*} value - The data that corresponds to the given key
 * @returns undefined
 */
export function add(filename, key, value) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Reading error', readErr);
      return;
    }

    // Parse the JSON string from the file into a JS Object.
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Add the new key and value to the content object.
    jsonContentObj[key] = value;

    // Transform the updated content object back into a JSON string.
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated JSON to original file, overwriting original contents.
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.error('Writing error', writeErr);
        return;
      }
      console.log('Success!');
    });
  };

  // Read the file called filename and call handleFileRead on its contents.
  readFile(filename, 'utf-8', handleFileRead);
}
