import { dataURIPrefix } from "./constants";
import { LoaderInput, LoaderResult } from "./types";
import { isDataURI, isFileURI } from "./utils";

export const loadAsync = async <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
): Promise<LoaderResult<Exports>> => {

  const _readBufferFromFileUrl = async (filename: string): Promise<Buffer> => {
    const path = new URL(filename);
    const fs = require("fs");
    const content: Buffer = await fs.promises.readFile(path);
    return content;
  };

  const _readBufferFromDataURI = async (dataURI: string): Promise<Buffer> => {
    const content = dataURI.replace(dataURIPrefix, "");
    return Buffer.from(content, "base64");
  };

  const _readBufferFromURL = async (url: string): Promise<Buffer> => {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  };

  const _readBuffer = (filename: string): Promise<Buffer> => {
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

  const _instantiate = async (): Promise<WebAssembly.Instance> => {
    const buffer = await _readBuffer(input.filename);
    return _bufferToInstance(buffer);
  };

  const instance = await _instantiate();

  return {
    instance,
    exports: <any>instance.exports,
  };
};
