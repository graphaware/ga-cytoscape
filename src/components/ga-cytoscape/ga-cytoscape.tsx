import { Component, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import cytoscape, {
  Core,
  ElementDefinition,
  ElementsDefinition,
  EventObject,
  Ext,
  LayoutOptions,
  Position,
  Singular,
  Stylesheet,
} from 'cytoscape';
import { handleLayoutsChange, LayoutWithOptions } from "../../utils/layout-utils";
import { makeEdgesNonselectable } from "../../utils/selection-utils";
import { addNewGraph } from "../../utils/element-utils";

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
      throw new Error("Elements changed without Cytoscape ready, should not happen")
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
      throw new Error("Layout changed without Cytoscape ready, should not happen")
    }

    this.currentLayoutsBatch = handleLayoutsChange(this.cy, this.currentLayoutsBatch, newValue);
  }

  @Prop() stylesheet?: Stylesheet[] | Promise<Stylesheet[]>;
  @Watch('stylesheet')
  styleChanged(newValue: Stylesheet | Stylesheet[] | string): void {
    if (!this.cy) {
      throw new Error("Style changed without Cytoscape ready, should not happen")
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

  @Event() ctxmenu!: EventEmitter<EventObject>;
  @Event() nodeClicked!: EventEmitter<EventObject>;
  @Event() nodeMouseOut!: EventEmitter<EventObject>;
  @Event() nodeMouseOver!: EventEmitter<EventObject>;
  @Event() edgeClicked!: EventEmitter<EventObject>;
  @Event() edgeMouseOut!: EventEmitter<EventObject>;
  @Event() edgeMouseOver!: EventEmitter<EventObject>;

  cyContainer?: HTMLDivElement;
  cy?: Core;
  currentLayoutsBatch: LayoutWithOptions[] = [];
  clickDisabled: boolean = false;

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

    this.elementsChanged(this.elements);
    this.layoutChanged(this.layout);
    this.registerEventHandlers();
  }

  private componentDidUnload(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
  }

  private registerEventHandlers(): void {
    if (!this.cy) {
      throw new Error("Registering event handlers without Cytoscape ready, should not happen")
    }

    this.cy.on('tap', e => {
      if (this.clickDisabled) {
        this.clickDisabled = false;
        return;
      }

      if (e.target !== this.cy) {
        if ((e.target as Singular).isNode()) {
          this.nodeClicked.emit(e);
        } else {
          this.edgeClicked.emit(e);
        }
      }
    });
    this.cy.on('cxttap taphold', e => {
      this.clickDisabled = e.type === 'taphold'; // prevent launching another click/tap event after taphold
      this.ctxmenu.emit(e);
    });
    this.cy.on('mouseover', 'node', e => {
      this.nodeMouseOver.emit(e);
    });
    this.cy.on('mouseover', 'edge', e => {
      this.edgeMouseOver.emit(e);
    });
    this.cy.on('mouseout', 'node', e => {
      this.nodeMouseOut.emit(e);
    });
    this.cy.on('mouseout', 'edge', e => {
      this.edgeMouseOut.emit(e);
    });
  }

  render() {
    return (
      <div class="ga-cytoscape" ref={el => this.cyContainer = el}></div>
    );
  }
}
