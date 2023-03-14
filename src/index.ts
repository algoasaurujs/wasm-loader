import { loadBrowserSync } from "./browser/loadBrowserSync";

export { loadNodejsSync } from "./nodejs/loadNodejsSync";
export { loadNodejsAsync } from "./nodejs/loadNodejsAsync";
export { loadBrowserSync } from "./browser/loadBrowserSync";
export { loadBrowserAsync } from "./browser/loadBrowserAsync";

export { loadAsync } from "./loadAsync";
export { loadSync } from "./loadSync";

console.log(loadBrowserSync({filename:'./test.wasm'}));