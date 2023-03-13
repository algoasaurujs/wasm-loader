export type LoaderInputPartial<I> = {
  filename: string;
  importObject?: I;
};

export type LoaderInputRequired<I> = {
  filename: string;
  importObject: I;
};

export type LoaderInput<I extends WebAssembly.Imports> = I extends never
  ? LoaderInputPartial<I>
  : LoaderInputRequired<I>;

export type LoaderResult<E> = {
  instance: WebAssembly.Instance;
  exports: E;
};
