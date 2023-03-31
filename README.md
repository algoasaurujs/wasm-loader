# wasm-loader

**wasm-loader** is an open-source library that allows you to load WebAssembly modules directly in your JavaScript projects. With **wasm-loader**, you can easily import and use compiled WebAssembly modules in your JavaScript code, giving you the performance benefits of WebAssembly while still working within the JavaScript ecosystem. **wasm-loader** supports both browser and Node.js environments and can load WebAssembly modules synchronously or asynchronously.

## Installation

To use **wasm-loader**, you will need to have Node.js and npm installed on your system. Once you have these installed, you can install **wasm-loader** using npm:

    npm install wasm-loader

## Usage

To use **wasm-loader**, you will first need to compile your WebAssembly module into a `.wasm` file. You can then use the `wasmLoader` function to load the module into your JavaScript code:

```typescript
import { wasmLoader } from 'wasm-loader'; 

async function main() { 
  const wasmModule = await wasmLoader('path/to/my/module.wasm'); 
  // use wasmModule.exports to call functions in your module 
}

main();
```

Alternatively, if you are using a browser environment and you want to load the module synchronously, you can use the `loadSync` function:

```typescript
import { loadSync } from 'wasm-loader'; 
const wasmModule = loadSync('path/to/my/module.wasm'); 
// use wasmModule.exports to call functions in your module
```

In a Node.js environment, you can also load the module synchronously using the `loadSync` function:

```typescript
const { loadSync } = require('wasm-loader'); 
const wasmModule = loadSync('path/to/my/module.wasm'); 
// use wasmModule.exports to call functions in your module
```

You can also use **wasm-loader** with other loaders, such as `file-loader` or `url-loader`, to load your WebAssembly module from a remote server or a CDN:

```typescript
import { wasmLoader } from 'wasm-loader'; 
import wasmUrl from 'file-loader!./path/to/my/module.wasm';

async function main() { 
  const wasmModule = await wasmLoader(wasmUrl); 
  // use wasmModule.exports to call functions in your module 
} 
main();
```

The `wasmLoader` and `loadSync` functions both take a single argument, which can be either a path to a local `.wasm` file or a URL to a remote `.wasm` file. The functions return a `WebAssembly.Module` object, which you can then use to call functions in your module.

## API

### wasmLoader

The `wasmLoader` function loads a WebAssembly module asynchronously. It takes a single argument, which can be either a path to a local `.wasm` file or a URL to a remote `.wasm` file. The function returns a Promise that resolves to a `WebAssembly.Module` object.

```typescript
async function wasmLoader(modulePathOrUrl: string): Promise<WebAssembly.Module>;
```

### loadSync

The `loadSync` function loads a WebAssembly module synchronously. It takes a single argument, which can be either a path to a local `.wasm` file or a URL to a remote `.wasm` file. The function returns a `WebAssembly.Module` object.

```typescript
function loadSync(modulePathOrUrl: string): WebAssembly.Module;
```

## Contributing

**wasm-loader** is an open-source project and contributions are always welcome! If you have an issue or a feature request, please open a new issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request.

## License

**wasm-loader** is licensed under the MIT License. See [LICENSE]() for more information.
