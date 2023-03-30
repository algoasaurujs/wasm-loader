import { loadBrowserSync } from "./browser/loadBrowserSync";
import { loadNodejsSync } from "./nodejs/loadNodejsSync";
import { LoaderSync } from "./types";
import { isWeb } from "./utils";

/**
 * Synchronously loads a WebAssembly module from a given input.
 *
 * @remarks
 * This function determines the appropriate loader to use based on the current environment (browser or Node.js).
 *
 * @param input - The input representing the WebAssembly module to load.
 * @returns A Promise that resolves to the WebAssembly module instance.
 */
export const loadSync: LoaderSync = (input) => {
  if (isWeb()) {
    return loadBrowserSync(input);
  }
  return loadNodejsSync(input);
};
