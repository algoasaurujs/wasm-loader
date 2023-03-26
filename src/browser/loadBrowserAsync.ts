import { LoaderAsync } from "../types";
import { isDataURI } from "../utils";
import { loadFromDataURL } from "./loadFromDataURL";

/**
 * Loads a WebAssembly module from a URL or a data URL in the browser **asynchronously**
 * and returns an instance of the module.
 *
 * @param input - The input for the loader containing the filename and the import object.
 * @returns The loaded WebAssembly module instance and its exports.
 */
export const loadBrowserAsync: LoaderAsync = async (input) => {
  /**
   * Loads a WebAssembly module from the specified URL and returns an instance of it.
   *
   * @returns An instance of the loaded WebAssembly module.
   */
  const _loadFromURL = async (): Promise<WebAssembly.Instance> => {
    const fetchPromise = fetch(input.filename);
    const { instance } = await WebAssembly.instantiateStreaming(
      fetchPromise,
      input?.importObject
    );
    return instance;
  };

  /**
   * Instantiates a WebAssembly module from a URL or a data URL,
   * depending on the format of the input filename,
   * and returns an instance of the module.
   * @returns An instance of the loaded WebAssembly module.
   */
  const _instantiate = (): Promise<WebAssembly.Instance> => {
    // Check whether the input filename is a data URL
    if (isDataURI(input.filename)) {
      return new Promise(() =>
        loadFromDataURL(input.filename, input?.importObject)
      );
    }
    return _loadFromURL();
  };

  const instance = await _instantiate();

  return {
    instance,
    exports: <any>instance.exports,
  };
};
