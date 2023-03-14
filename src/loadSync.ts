import { dataURIPrefix } from "./constants";
import { LoaderInput, LoaderResult } from "./types";
import { isDataURI, isFileURI } from "./utils";
import BufferPoly from "buffer";

export const loadSync = <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): LoaderResult<Exports> => {

  const _readBufferFromFileUrl = (filename: string): Buffer => {
    const path = new URL(filename);
    const fs = require("fs");
    const content: Buffer = fs.readFileSync(path);
    return content;
  };

  const _readBufferFromDataURI = (dataURI: string): Buffer => {
    const content = dataURI.replace(dataURIPrefix, "");
    return BufferPoly.Buffer.from(content, "base64");
  };

  const _readBufferFromURL = (url: string): Buffer => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
    return BufferPoly.Buffer.from(xhr.response);
  };

  const _readBuffer = (filename: string): Buffer => {
    if (isDataURI(filename)) {
      return _readBufferFromDataURI(filename);
    } else if (isFileURI(filename)) {
      return _readBufferFromFileUrl(filename);
    } else {
      return _readBufferFromURL(filename);
    }
  };

  const _bufferToInstance = (buffer: Buffer): WebAssembly.Instance => {
    const wasmBytes = new Uint8Array(buffer);
    const module = new WebAssembly.Module(wasmBytes);
    return new WebAssembly.Instance(module, input?.importObject);
  };

  const _instantiate = (): WebAssembly.Instance => {
    const buffer = _readBuffer(input.filename);
    return _bufferToInstance(buffer);
  };

  const instance = _instantiate();

  return {
    instance,
    exports: <any>instance.exports,
  };
};
