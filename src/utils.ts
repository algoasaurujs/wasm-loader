/// <reference lib="webworker" />

import { dataURIPrefix } from "./constants";

export const isDataURI = (filename: string) => {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
};

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
export const isFileURI = (filename: string) => {
  return filename.startsWith("file://");
};

export const isWeb = () => {
  return typeof window == "object";
};

export const isWorker = () => {
  return (
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope
  );
};

export const isNode = () => {
  return (
    typeof process == "object" &&
    typeof process.versions == "object" &&
    typeof process.versions.node == "string"
  );
};

export const isShell = () => {
  return !isWeb() && !isNode() && !isWorker();
};
