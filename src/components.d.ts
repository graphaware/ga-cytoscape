/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ElementDefinition,
  ElementsDefinition,
  EventObject,
  LayoutOptions,
  Stylesheet,
} from 'cytoscape';
import {
  EventEmitter,
} from '@stencil/core';


export namespace Components {

  interface GaCytoscape {
    'elements': ElementsDefinition | ElementDefinition[] | undefined;
    'layout': LayoutOptions | LayoutOptions[];
    'selectableEdges': boolean;
    'stylesheet': Stylesheet[] | Promise<Stylesheet[]>;
  }
  interface GaCytoscapeAttributes extends StencilHTMLAttributes {
    'elements'?: ElementsDefinition | ElementDefinition[] | undefined;
    'layout'?: LayoutOptions | LayoutOptions[];
    'onCtxmenu'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeClicked'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeMouseOut'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeMouseOver'?: (event: CustomEvent<EventObject>) => void;
    'onNodeClicked'?: (event: CustomEvent<EventObject>) => void;
    'onNodeMouseOut'?: (event: CustomEvent<EventObject>) => void;
    'onNodeMouseOver'?: (event: CustomEvent<EventObject>) => void;
    'selectableEdges'?: boolean;
    'stylesheet'?: Stylesheet[] | Promise<Stylesheet[]>;
  }
}

declare global {
  interface StencilElementInterfaces {
    'GaCytoscape': Components.GaCytoscape;
  }

  interface StencilIntrinsicElements {
    'ga-cytoscape': Components.GaCytoscapeAttributes;
  }


  interface HTMLGaCytoscapeElement extends Components.GaCytoscape, HTMLStencilElement {}
  var HTMLGaCytoscapeElement: {
    prototype: HTMLGaCytoscapeElement;
    new (): HTMLGaCytoscapeElement;
  };

  interface HTMLElementTagNameMap {
    'ga-cytoscape': HTMLGaCytoscapeElement
  }

  interface ElementTagNameMap {
    'ga-cytoscape': HTMLGaCytoscapeElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
