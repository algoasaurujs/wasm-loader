import { LoaderInput, LoaderResult } from "./types";
import { isWeb } from "./utils";
import { loadBrowserAsync } from "./browser/loadBrowserAsync";
import { loadNodejsAsync } from "./nodejs/loadNodejsAsync";

export const loadAsync = async <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): Promise<LoaderResult<Exports>> => {
  if (isWeb()) {
    return loadBrowserAsync(input);
  }
  return loadNodejsAsync(input);
};
