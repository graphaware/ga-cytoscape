import { Component, Event, EventEmitter, Method, Prop, Watch } from '@stencil/core';
import cytoscape, {
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
import { addNewGraph } from '../../utils/element-utils';
import { registerEventEmitters } from '../../utils/event-utils';
import { handleLayoutsChange, LayoutWithOptions } from '../../utils/layout-utils';
import { makeEdgesNonselectable } from '../../utils/selection-utils';

@Component({
  tag: 'ga-cytoscape',
  styleUrl: 'ga-cytoscape.pcss',
  shadow: false, // ShadowDOM has issues with mouseover/mouseout core events :(
})
export class GaCytoscape {
  @Prop() elements?: ElementsDefinition | ElementDefinition[] | undefined;
  @Watch('elements')
  elementsChanged(newValue: ElementsDefinition | ElementDefinition[] | undefined): void {
    if (!this.cy) {
      throw new Error('Elements changed without Cytoscape ready, should not happen');
    }

    addNewGraph(this.cy, newValue);
    this.cy.fit(undefined, 20);

    if (!this.selectableEdges) {
      makeEdgesNonselectable(this.cy);
    }
  }

  @Prop() layout?: LayoutOptions | LayoutOptions[] = { name: 'cose' };
  @Watch('layout')
  layoutChanged(newValue: LayoutOptions | LayoutOptions[] | undefined): void {
    if (!this.cy) {
      throw new Error('Layout changed without Cytoscape ready, should not happen');
    }

    this.currentLayoutsBatch = handleLayoutsChange(this.cy, this.currentLayoutsBatch, newValue);
  }

  @Prop() stylesheet?: Stylesheet[] | Promise<Stylesheet[]>;
  @Watch('stylesheet')
  styleChanged(newValue: Stylesheet | Stylesheet[] | string): void {
    if (!this.cy) {
      throw new Error('Style changed without Cytoscape ready, should not happen');
    }

    this.cy.style(newValue);
  }

  @Prop() plugins: Ext[] = [];

  @Prop() pan?: Position;
  @Prop() maxZoom?: number;
  @Prop() minZoom?: number;
  @Prop() zoom?: number;

  @Prop() grabEnabled?: boolean = true;
  @Prop() panEnabled?: boolean;
  @Prop() selectableEdges?: boolean = false;
  @Prop() zoomEnabled?: boolean;

  @Event() ctxmenu: EventEmitter<EventObject>;
  @Event() nodeClicked: EventEmitter<EventObject>;
  @Event() nodeMouseOut: EventEmitter<EventObject>;
  @Event() nodeMouseOver: EventEmitter<EventObject>;
  @Event() edgeClicked: EventEmitter<EventObject>;
  @Event() edgeMouseOut: EventEmitter<EventObject>;
  @Event() edgeMouseOver: EventEmitter<EventObject>;
  @Event() selectionChanged: EventEmitter<EventObject>;

  cyContainer?: HTMLDivElement;
  cy?: Core;
  cyPromise: Promise<Core> = new Promise(resolve => {
    this.cyResolver = resolve;
  });
  cyResolver: (value: Core) => void;
  currentLayoutsBatch: LayoutWithOptions[] = [];

  @Method()
  async addElements(
    elements: ElementDefinition | ElementDefinition[] | CollectionArgument,
  ): Promise<CollectionReturnValue> {
    const cy = await this.cyPromise;
    return cy.add(elements);
  }

  @Method()
  async removeElements(elements: CollectionArgument | Selector): Promise<CollectionReturnValue> {
    const cy = await this.cyPromise;
    return cy.remove(elements);
  }

  @Method()
  async $id(id: string): Promise<CollectionReturnValue> {
    const cy = await this.cyPromise;
    return cy.$id(id);
  }

  @Method()
  async $(selector: Selector): Promise<CollectionReturnValue> {
    const cy = await this.cyPromise;
    return cy.$(selector);
  }

  @Method()
  async getNodes(selector?: Selector): Promise<NodeCollection> {
    const cy = await this.cyPromise;
    return cy.nodes(selector);
  }

  @Method()
  async getEdges(selector?: Selector): Promise<EdgeCollection> {
    const cy = await this.cyPromise;
    return cy.edges(selector);
  }

  @Method()
  async startBatch(): Promise<void> {
    const cy = await this.cyPromise;
    return cy.startBatch();
  }

  @Method()
  async endBatch(): Promise<void> {
    const cy = await this.cyPromise;
    return cy.endBatch();
  }

  private componentDidLoad(): void {
    console.debug('ga-cytocape::componentDidLoad');
    this.plugins.forEach(plugin => {
      cytoscape.use(plugin);
    });

    const options: cytoscape.CytoscapeOptions = {
      autoungrabify: this.grabEnabled,
      container: this.cyContainer,
      style: this.stylesheet,
      pan: this.pan,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      userPanningEnabled: this.panEnabled,
      userZoomingEnabled: this.zoomEnabled,
      // wheelSensitivity: 0.33, // this gives annoying console warning
      zoom: this.zoom,
    };
    this.cy = cytoscape(options);
    this.cyResolver(this.cy);

    this.elementsChanged(this.elements);
    this.layoutChanged(this.layout);

    registerEventEmitters(this.cy, [
      { events: 'tap', selector: 'node', emitter: this.nodeClicked },
      { events: 'tap', selector: 'edge', emitter: this.edgeClicked },
      { events: 'cxttap', emitter: this.ctxmenu },
      { events: 'mouseover', selector: 'node', emitter: this.nodeMouseOver },
      { events: 'mouseover', selector: 'edge', emitter: this.edgeMouseOver },
      { events: 'mouseout', selector: 'node', emitter: this.nodeMouseOut },
      { events: 'mouseout', selector: 'edge', emitter: this.edgeMouseOut },
      { events: 'select unselect', emitter: this.selectionChanged, debounce: true },
    ]);
  }

  private componentDidUnload(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
  }

  render() {
    return (
      <div class='ga-cytoscape' ref={el => this.cyContainer = el}></div>
    );
  }
}
