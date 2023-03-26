import { dataURIPrefix } from "../constants";

/**
 * Loads a WebAssembly module from a data URL and returns an instance of the module.
 * @returns An instance of the loaded WebAssembly module.
 */
export const loadFromDataURL = (
  data: string,
  importObject?: WebAssembly.Imports
): WebAssembly.Instance => {
  /**
   * Converts a base64-encoded string to an array of numbers representing the raw array buffer.
   * @param base64 - The base64-encoded string to convert.
   * @returns An array of numbers representing the raw bytes of the decoded data.
   */
  const _base64ToBuffer = (base64: string): number[] => {
    // Decode the base64 string to a binary string
    const binaryString = window.atob(base64);
    // Convert the binary string to array buffer
    return binaryString.split("").map((c) => c.charCodeAt(0));
  };

  // Extract the base64-encoded data from the data URL
  const content = data.replace(dataURIPrefix, "");

  // Convert the base64-encoded data to a Uint8Array
  const wasmBytes = Uint8Array.from(_base64ToBuffer(content));

  // Instantiate the WebAssembly module and return an instance
  const module = new WebAssembly.Module(wasmBytes);
  return new WebAssembly.Instance(module, importObject);
};
