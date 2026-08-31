// Browser stub for onnxruntime-node.
// This module is a Node.js-only native addon that must never run in the browser.
// @xenova/transformers imports it alongside onnxruntime-web and selects between
// them at runtime via an `if (typeof process !== 'undefined' && process?.release?.name === 'node')`
// check. In the browser the Node path is never executed, so an empty export is safe.
export default {};
