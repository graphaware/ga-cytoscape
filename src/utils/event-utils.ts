import { EventEmitter } from '@stencil/core';
import { Core, EventNames, EventObject, Selector } from 'cytoscape';
import { debounce } from 'ts-debounce';

export interface EventEmitterConfig {
  events: EventNames;
  selector?: Selector;
  emitter: EventEmitter<EventObject>;
  debounce?: boolean;
}

export function emit(emitter: EventEmitter, event: EventObject): void {
  emitter.emit(event);
}

export const emitDebounced = debounce(emit);

export function registerEventEmitters(cy: Core, list: EventEmitterConfig[]): void {
  list.forEach(item => {
    if (item.selector) {
      cy.on(item.events, item.selector,e => {
        if (item.emitter) {
          item.debounce
            ? emitDebounced(item.emitter, e)
            : emit(item.emitter, e);
        }
      });
    } else {
      cy.on(item.events, e => {
        if (item.emitter) {
          item.debounce
            ? emitDebounced(item.emitter, e)
            : emit(item.emitter, e);
        }
      });
    }
  });
}
