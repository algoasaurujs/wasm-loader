import { LoaderAsync } from "./types";
import { isWeb } from "./utils";
import { loadBrowserAsync } from "./browser/loadBrowserAsync";
import { loadNodejsAsync } from "./nodejs/loadNodejsAsync";

/**
 * Asynchronously loads a WebAssembly module from a given input.
 *
 * @remarks
 * This function determines the appropriate loader to use based on the current environment (browser or Node.js).
 *
 * @param input - The input representing the WebAssembly module to load.
 * @returns A Promise that resolves to the WebAssembly module instance.
 */
export const loadAsync: LoaderAsync = async (input) => {
  if (isWeb()) {
    return loadBrowserAsync(input);
  }
  return loadNodejsAsync(input);
};
