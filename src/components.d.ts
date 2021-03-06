/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  CollectionArgument,
  CollectionReturnValue,
  Core,
  EdgeCollection,
  ElementDefinition,
  ElementsDefinition,
  EventObject,
  Ext,
  LayoutOptions,
  NodeCollection,
  Position,
  Selector,
  Stylesheet,
} from 'cytoscape';

export namespace Components {
  interface GaCytoscape {
    '$': (selector: string) => Promise<cytoscape.CollectionReturnValue>;
    '$id': (id: string) => Promise<cytoscape.CollectionReturnValue>;
    'addElements': (elements: cytoscape.ElementDefinition | cytoscape.ElementDefinition[] | cytoscape.EdgeSingular | cytoscape.NodeSingular | cytoscape.Collection<cytoscape.SingularElementReturnValue, cytoscape.SingularElementArgument> | cytoscape.EdgeCollection | cytoscape.NodeCollection) => Promise<cytoscape.CollectionReturnValue>;
    'cy'?: Core;
    'elements'?: ElementsDefinition | ElementDefinition[] | undefined;
    'endBatch': () => Promise<void>;
    'getEdges': (selector?: string | undefined) => Promise<cytoscape.EdgeCollection>;
    'getNodes': (selector?: string | undefined) => Promise<cytoscape.NodeCollection>;
    'grabEnabled'?: boolean;
    'layout'?: LayoutOptions | LayoutOptions[];
    'maxZoom'?: number;
    'minZoom'?: number;
    'pan'?: Position;
    'panEnabled'?: boolean;
    'plugins': Ext[];
    'removeElements': (elements: string | cytoscape.EdgeSingular | cytoscape.NodeSingular | cytoscape.Collection<cytoscape.SingularElementReturnValue, cytoscape.SingularElementArgument> | cytoscape.EdgeCollection | cytoscape.NodeCollection) => Promise<cytoscape.CollectionReturnValue>;
    'selectableEdges'?: boolean;
    'selected'?: ElementDefinition[];
    'startBatch': () => Promise<void>;
    'stylesheet'?: Stylesheet[] | Promise<Stylesheet[]>;
    'zoom'?: number;
    'zoomEnabled'?: boolean;
  }
}

declare global {


  interface HTMLGaCytoscapeElement extends Components.GaCytoscape, HTMLStencilElement {}
  var HTMLGaCytoscapeElement: {
    prototype: HTMLGaCytoscapeElement;
    new (): HTMLGaCytoscapeElement;
  };
  interface HTMLElementTagNameMap {
    'ga-cytoscape': HTMLGaCytoscapeElement;
  }
}

declare namespace LocalJSX {
  interface GaCytoscape extends JSXBase.HTMLAttributes<HTMLGaCytoscapeElement> {
    'cy'?: Core;
    'elements'?: ElementsDefinition | ElementDefinition[] | undefined;
    'grabEnabled'?: boolean;
    'layout'?: LayoutOptions | LayoutOptions[];
    'maxZoom'?: number;
    'minZoom'?: number;
    'onCtxmenu'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeClicked'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeMouseOut'?: (event: CustomEvent<EventObject>) => void;
    'onEdgeMouseOver'?: (event: CustomEvent<EventObject>) => void;
    'onNodeClicked'?: (event: CustomEvent<EventObject>) => void;
    'onNodeMouseOut'?: (event: CustomEvent<EventObject>) => void;
    'onNodeMouseOver'?: (event: CustomEvent<EventObject>) => void;
    'onSelectionChanged'?: (event: CustomEvent<EventObject>) => void;
    'pan'?: Position;
    'panEnabled'?: boolean;
    'plugins'?: Ext[];
    'selectableEdges'?: boolean;
    'selected'?: ElementDefinition[];
    'stylesheet'?: Stylesheet[] | Promise<Stylesheet[]>;
    'zoom'?: number;
    'zoomEnabled'?: boolean;
  }

  interface IntrinsicElements {
    'ga-cytoscape': GaCytoscape;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


