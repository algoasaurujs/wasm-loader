import { LoaderSync } from "../types";
import { isDataURI } from "../utils";
import { loadFromDataURL } from "./loadFromDataURL";

/**
 * Loads a WebAssembly module from a URL or a data URL in the browser **synchronously**
 * and returns an instance of the module.
 *
 * @param input - The input for the loader containing the filename and the import object.
 * @returns The loaded WebAssembly module instance and its exports.
 */
export const loadBrowserSync: LoaderSync = (input) => {
  /**
   * Loads a WebAssembly module from the specified URL and returns an instance of it.
   *
   * @returns An instance of the loaded WebAssembly module.
   */
  const _loadFromURL = (): WebAssembly.Instance => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", input.filename, false);
    xhr.send(null);
    const module = WebAssembly.instantiate(xhr.response);
    return new WebAssembly.Instance(module, input?.importObject);
  };

  /**
   * Instantiates a WebAssembly module from a URL or a data URL,
   * depending on the format of the input filename,
   * and returns an instance of the module.
   * @returns An instance of the loaded WebAssembly module.
   */
  const _instantiate = (): WebAssembly.Instance => {
    // Check whether the input filename is a data URL
    if (isDataURI(input.filename)) {
      return loadFromDataURL(input.filename, input?.importObject);
    }
    return _loadFromURL();
  };

  const instance = _instantiate();

  return {
    instance,
    exports: <any>instance.exports,
  };
};
