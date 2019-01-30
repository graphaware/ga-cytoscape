import { debounce } from "ts-debounce";
import { EventEmitter } from "@stencil/core";
import { EventObject } from "cytoscape";

export function emit(emitter: EventEmitter, event: EventObject): void {
  emitter.emit(event);
}

export const emitDebounced = debounce(emit);
