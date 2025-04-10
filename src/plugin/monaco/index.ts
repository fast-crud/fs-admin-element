import { registerWorker } from "@fast-crud/fast-extends/src/editor/components/fs-editor-code/workers";

export function setupMonaco() {
  registerWorker(["yaml", "yml"], async () => {
    const worker = await import("./yaml.worker?worker");
    return worker.default;
  });
}
