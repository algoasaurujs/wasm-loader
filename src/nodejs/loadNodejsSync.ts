import { dataURIPrefix } from "./../constants";
import { LoaderSync } from "./../types";
import { isDataURI, isFileURI } from "./../utils";

/**
 * Loads a WebAssembly module synchronously in Node.js environment.
 * @param input - Loader input object.
 * @returns LoaderResult object containing the instance and its exports.
 */
export const loadNodejsSync: LoaderSync = (input) => {
  /**
   * Reads a buffer from a file URL.
   * @param filename - The file URL.
   * @returns The buffer containing the file contents.
   */
  const _readBufferFromFileUrl = (filename: string): Buffer => {
    const path = new URL(filename);
    const fs = require("fs");
    const content: Buffer = fs.readFileSync(path);
    return content;
  };

  /**
   * Reads a buffer from a data URI.
   * @param dataURI - The data URI.
   * @returns The buffer containing the data.
   */
  const _readBufferFromDataURI = (dataURI: string): Buffer => {
    const content = dataURI.replace(dataURIPrefix, "");
    return Buffer.from(content, "base64");
  };

  /**
   * Reads a buffer from a URL.
   * @param url - The URL.
   * @returns The buffer containing the URL contents.
   */
  const _readBufferFromURL = (url: string): Buffer => {
    const syncRequest = require("sync-request");
    const res = syncRequest("GET", url);
    return Buffer.from(res.getBody());
  };

  /**
   * Reads a buffer from a filename.
   * @param filename - The filename to read.
   * @returns The buffer containing the file contents.
   */
  const _readBuffer = (filename: string): Buffer => {
    if (isDataURI(filename)) {
      return _readBufferFromDataURI(filename);
    } else if (isFileURI(filename)) {
      return _readBufferFromFileUrl(filename);
    } else {
      return _readBufferFromURL(filename);
    }
  };

  /**
   * Converts a buffer to a WebAssembly instance.
   * @param buffer - The buffer to convert.
   * @returns The WebAssembly instance.
   */
  const _bufferToInstance = (buffer: Buffer): WebAssembly.Instance => {
    const wasmBytes = new Uint8Array(buffer);
    const module = new WebAssembly.Module(wasmBytes);
    return new WebAssembly.Instance(module, input?.importObject);
  };

  /**
   * Instantiates the WebAssembly module.
   * @returns The WebAssembly instance.
   */
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
