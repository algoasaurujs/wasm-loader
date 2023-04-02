# wasm-loader

**wasm-loader** is an open-source library that allows you to load WebAssembly modules directly in your JavaScript projects. With **wasm-loader**, you can easily import and use compiled WebAssembly modules in your JavaScript code, giving you the performance benefits of WebAssembly while still working within the JavaScript ecosystem. **wasm-loader** supports both browser and Node.js environments and can load WebAssembly modules synchronously or asynchronously.

## [Prerequisite](#prerequisite)

As previously mentioned to use this library you need to compile your code to WebAssembly with your preferred tool. These are some tools that you can use to compile your code into WebAssembly:

*   [Emscripten](https://emscripten.org/): Emscripten is a popular toolchain for compiling C and C++ code to WebAssembly and JavaScript.
*   [WasmFiddle](https://wasdk.github.io/WasmFiddle/): WasmFiddle is an online playground for experimenting with WebAssembly code and running it in the browser.
*   [wasm-pack](https://rustwasm.github.io/wasm-pack/): wasm-pack is a tool for building and packaging Rust libraries as WebAssembly modules that can be used in JavaScript projects.
*   [AssemblyScript](https://www.assemblyscript.org/): AssemblyScript is a TypeScript-like language for compiling to WebAssembly, with a focus on ease of use and developer experience.

Each of these tools has its own strengths and weaknesses, so it's important to choose the one that best fits your needs. Once you have compiled your code to WebAssembly, you can use the **wasm-loader** to load the module into your JavaScript code.

In addition to the tools listed above, there are also many resources available online for learning how to write and compile WebAssembly code. Some good places to start include the [official WebAssembly website](https://webassembly.org/), the [WebAssembly MDN documentation](https://developer.mozilla.org/en-US/docs/WebAssembly), and the [Rust and WebAssembly book](https://rustwasm.github.io/docs/book/). With the help of these resources and **wasm-loader**, you can start taking advantage of the speed and performance benefits of WebAssembly in your JavaScript projects.

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Types](#types)    
- [Browser](#browser)
  - [Async](#browserasync)
  - [Sync](#browsersync)
- [NodeJS](#nodejs)
  - [Async](#nodejsasync)
  - [Sync](#nodejssync)

## [Installation](#installation)

To use **wasm-loader**, you will need to have Node.js and npm installed on your system. Once you have these installed, you can install **wasm-loader** using npm:

```bash
    npm install @algoasaurujs/wasm-loader
```

## [Usage](#usage)

To use **wasm-loader**, you will first need to [compile your WebAssembly module](#prerequisite) into a `.wasm` file. You can then use the **wasm-loader** functions to load the module into your JavaScript/TypeScript code:

```typescript
import { loadAsync } from '@algoasaurujs/wasm-loader'; 

async function main() { 
  const wasmModule = await loadAsync({ filename: 'path/to/my/module.wasm' }); 
  // use wasmModule.exports to call functions in your module 
}

main();
```

You can also use **wasm-loader** with other loaders, such as `file-loader` or `url-loader`, to load your WebAssembly module from a remote server or a CDN:

```typescript
import { loadSync } from '@algoasaurujs/wasm-loader'; 
import wasmUrl from 'file-loader!./path/to/my/module.wasm';

async function main() { 
  const wasmModule = await loadSync({ filename: wasmUrl }); 
  // use wasmModule.exports to call functions in your module 
} 
main();
```

The `loadAsync` and `loadSync` functions both take a single argument, which can be either a path to a local `.wasm` file or a URL to a remote `.wasm` file. The functions return a `WebAssembly.Module` object, which you can then use to call functions in your module.

## [Types](#types)

### [LoaderResult Type](#loaderresult-type)
```typescript
type LoaderResult<E> = {
  instance: WebAssembly.Instance;
  exports: E;
};
```

### [LoaderInput Type](#loaderinput-type)
```typescript
export type LoaderInput<I> = {
  filename: string;
  importObject?: I;
};
```

## [Browser](#browser)

### [Loading Async in Browser](#browserasync)

Loads a WebAssembly module from a URL or a data URL in the browser **asynchronously** and returns an instance of the module.

```typescript
import { loadBrowserAsync } from '@algoasaurujs/wasm-loader';
async function loadBrowserAsync<Exports, Imports>(input: [LoaderInput<Imports>](#loaderinput-type)): Promise<[LoaderResult<Exports>](#loaderresult-type)>;
```

### [Loading Sync in Browser](#browserasync)

Loads a WebAssembly module from a URL or a data URL in the browser **synchronously** and returns an instance of the module.

```typescript
import { loadBrowserSync } from '@algoasaurujs/wasm-loader';
function loadBrowserSync<Exports, Imports>(input: [LoaderInput<Imports>](#loaderinput-type)): [LoaderResult<Exports>](#loaderresult-type);
```

## Contributing

**wasm-loader** is an open-source project and contributions are always welcome! If you have an issue or a feature request, please open a new issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request.

## License

**wasm-loader** is licensed under the MIT License. See [LICENSE](./LICENSE) for more information.
