export type LoaderInputPartial<I> = {
  filename: string;
  importObject?: I;
};

export type LoaderInputRequired<I> = {
  filename: string;
  importObject: I;
};

export type LoaderInput<I> = I extends never
  ? LoaderInputPartial<I>
  : LoaderInputRequired<I>;

export type LoaderResult<E> = {
  instance: WebAssembly.Instance;
  exports: E;
};

/**
* Synchronous loader function that loads a WebAssembly module and returns an instance of it with exports.
* @typeParam Exports - The type of the WebAssembly exports.
* @typeParam Imports - The type of the WebAssembly imports.
* @param input - The input object containing the filename or data URL of the WebAssembly module to load and any required import objects.
* @returns An object containing the WebAssembly instance and its exports.
*/
export type LoaderSync = <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
) => LoaderResult<Exports>;

/**
* Asynchronous loader function that loads a WebAssembly module and returns an instance of it with exports.
* @typeParam Exports - The type of the WebAssembly exports.
* @typeParam Imports - The type of the WebAssembly imports.
* @param input - The input object containing the filename or data URL of the WebAssembly module to load and any required import objects.
* @returns An object containing the WebAssembly instance and its exports.
*/
export type LoaderAsync = <
  Exports extends WebAssembly.Exports = any,
  Imports extends WebAssembly.Imports = any
>(
  input: LoaderInput<Imports>
) => Promise<LoaderResult<Exports>>;
