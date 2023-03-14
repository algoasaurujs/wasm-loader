import { loadBrowserSync } from "./browser/loadBrowserSync";
import { loadNodejsSync } from "./nodejs/loadNodejsSync";
import { LoaderInput, LoaderResult } from "./types";
import { isWeb } from "./utils";

export const loadSync = <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): LoaderResult<Exports> => {
  if (isWeb()) {
    return loadBrowserSync(input);
  }
  return loadNodejsSync(input);
};
