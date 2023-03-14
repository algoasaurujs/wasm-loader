import { LoaderInput, LoaderResult } from "../types";
import { isDataURI } from "../utils";
import { dataURIPrefix } from "../constants";

export const loadBrowserSync = <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): LoaderResult<Exports> => {

  // var binaryArray = new Uint8Array(new TextEncoder().encode(binaryString));
  const _base64ToBuffer = (base64: string): number[] => {
    return window.atob(base64).split('').map(function (c) { return c.charCodeAt(0); })
  }

  const _loadFromDataURL = (): WebAssembly.Instance => {
    const dataURI = input.filename;
    const content = dataURI.replace(dataURIPrefix, "");
    const wasmBytes = new Uint8Array(_base64ToBuffer(content));
    const module = new WebAssembly.Module(wasmBytes);
    const instance = new WebAssembly.Instance(module, input?.importObject);
    return instance;
  };

  const _loadFromURL = (): WebAssembly.Instance => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", input.filename, false);
    xhr.send(null);
    const res: string = xhr.response;
    const base64 = window.btoa(res);
    const wasmBytes = new Uint8Array(_base64ToBuffer(base64));
    const module = new WebAssembly.Module(wasmBytes);
    return new WebAssembly.Instance(module, input?.importObject);
  };

  const _instantiate = (): WebAssembly.Instance => {
    if (isDataURI(input.filename)) {
      return _loadFromDataURL()
    }
    return _loadFromURL();
  };

  const instance = _instantiate();

  return {
    instance,
    exports: <any>instance.exports,
  };
};