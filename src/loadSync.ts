import { loadBrowserSync } from "./browser/loadBrowserSync";
import { loadNodejsSync } from "./nodejs/loadNodejsSync";
import { LoaderSync } from "./types";
import { isWeb } from "./utils";

export const loadSync: LoaderSync = (input) => {
  if (isWeb()) {
    return loadBrowserSync(input);
  }
  return loadNodejsSync(input);
};
