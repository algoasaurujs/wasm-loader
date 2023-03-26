import { dataURIPrefix } from "./../constants";
import { LoaderAsync } from "./../types";
import { isDataURI, isFileURI } from "./../utils";

/**
 * Loads a WebAssembly module in Node.js environment asynchronously based on the input filename.
 * The input filename could be a data URI, file URL or a regular URL.
 * @param input - Object that contains the input filename and import object for the WebAssembly module.
 * @returns A Promise that resolves to an object containing the instance and exports of the loaded WebAssembly module.
 */
export const loadNodejsAsync: LoaderAsync = async (input) => {
  /**
   * Reads and returns a Buffer containing the contents of a file from the file URL.
   * @param filename - The file URL to read from.
   * @returns A Promise that resolves to a Buffer containing the contents of the file.
   */
  const _readBufferFromFileUrl = async (filename: string): Promise<Buffer> => {
    const path = new URL(filename);
    const fs = require("fs");
    const content: Buffer = await fs.promises.readFile(path);
    return content;
  };

  /**
   * Decodes and returns a Buffer containing the raw bytes of a base64-encoded string.
   * @param dataURI - The base64-encoded data URI to decode.
   * @returns A Promise that resolves to a Buffer containing the raw bytes of the decoded data.
   */
  const _readBufferFromDataURI = async (dataURI: string): Promise<Buffer> => {
    const content = dataURI.replace(dataURIPrefix, "");
    return Buffer.from(content, "base64");
  };

  /**
   * Fetches and returns an ArrayBuffer containing the contents of a URL.
   * @param url - The URL to fetch from.
   * @returns A Promise that resolves to an ArrayBuffer containing the contents of the URL.
   */
  const _readBufferFromURL = async (url: string): Promise<ArrayBuffer> => {
    const nodeFetch = require("node-fetch");
    const res = await nodeFetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return arrayBuffer;
  };

  /**
   * Reads the contents of a file from the input filename and returns a Promise that resolves to a Buffer or ArrayBuffer
   * containing the contents based on the format of the input filename.
   * @param filename - The input filename to read from.
   * @returns A Promise that resolves to a Buffer or ArrayBuffer containing the contents of the input file.
   */
  const _readBuffer = (filename: string): Promise<Buffer | ArrayBuffer> => {
    if (isDataURI(filename)) {
      return _readBufferFromDataURI(filename);
    } else if (isFileURI(filename)) {
      return _readBufferFromFileUrl(filename);
    } else {
      return _readBufferFromURL(filename);
    }
  };

  /**
   * Converts a Buffer or ArrayBuffer to a WebAssembly.Instance.
   * @param buffer - The Buffer or ArrayBuffer to convert.
   * @returns A WebAssembly.Instance object.
   */
  const _bufferToInstance = (
    buffer: Buffer | ArrayBuffer
  ): WebAssembly.Instance => {
    const wasmBytes = new Uint8Array(buffer);
    const module = new WebAssembly.Module(wasmBytes);
    return new WebAssembly.Instance(module, input?.importObject);
  };

  /**
   * Instantiates a WebAssembly module asynchronously based on the input filename.
   * @returns A Promise that resolves to a WebAssembly.Instance object.
   */
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
