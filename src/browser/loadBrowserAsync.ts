import { LoaderInput, LoaderResult } from "../types";

export const loadBrowserAsync = async <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): Promise<LoaderResult<Exports>> => {
  const fetchPromise = fetch(input.filename);
  const { instance } = await WebAssembly.instantiateStreaming(fetchPromise, input?.importObject);

  return {
    instance,
    exports: <any>instance.exports,
  };
};
