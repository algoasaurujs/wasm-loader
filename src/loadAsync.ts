import { LoaderAsync } from "./types";
import { isWeb } from "./utils";
import { loadBrowserAsync } from "./browser/loadBrowserAsync";
import { loadNodejsAsync } from "./nodejs/loadNodejsAsync";

export const loadAsync: LoaderAsync = async (input) => {
  if (isWeb()) {
    return loadBrowserAsync(input);
  }
  return loadNodejsAsync(input);
};
