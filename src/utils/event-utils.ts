import { EventEmitter } from '@stencil/core';
import { EventObject } from 'cytoscape';
import { debounce } from 'ts-debounce';

export function emit(emitter: EventEmitter, event: EventObject): void {
  emitter.emit(event);
}

export const emitDebounced = debounce(emit);
