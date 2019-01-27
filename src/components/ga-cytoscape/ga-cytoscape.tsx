import { Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import cytoscape, {
  CollectionArgument,
  EdgeDataDefinition,
  ElementDefinition,
  ElementsDefinition,
  NodeDataDefinition,
  Stylesheet,
} from 'cytoscape';
import cola from 'cytoscape-cola';

// register cola extension
cytoscape.use(cola);

@Component({
  tag: 'ga-cytoscape',
  styleUrl: 'ga-cytoscape.pcss',
  shadow: false, // ShadowDOM has issues with mouseover/mouseout core events :(
})
export class GaCytoscape {
  @Prop() elements: ElementsDefinition | ElementDefinition[];
  @Watch('elements')
  elementsChanged(newValue: ElementDefinition | ElementDefinition[] | CollectionArgument | undefined): void {
    this.cy.elements().remove();
    if (newValue) {
      this.cy.add(newValue);
      this.cy.fit(undefined, 20);
    }
  }

  @Prop() stylesheet: Stylesheet[] | Promise<Stylesheet[]>;
  @Watch('stylesheet')
  styleChanged(newValue: Stylesheet | Stylesheet[] | string): void {
    this.cy.style(newValue);
  }

  @Event() nodeClicked: EventEmitter;
  @Event() edgeClicked: EventEmitter;
  @Event({
    composed: true,
    bubbles: true,
  }) nodeMouseOver: EventEmitter;
  @Event() edgeMouseOver: EventEmitter;
  @Event() nodeMouseOut: EventEmitter;
  @Event() edgeMouseOut: EventEmitter;
  @Event() ctxmenu: EventEmitter;

  @Element() el: HTMLElement;

  cy: cytoscape.Core;
  clickDisabled: boolean;

  private componentDidLoad(): void {
    console.log('componentDidLoad');

    this.cy = cytoscape({
      container: this.el.querySelector('.ga-cytoscape'),
      elements: this.elements,
      layout: {
        name: 'cola',
      },
      style: this.stylesheet,
      // wheelSensitivity: 0.33,
    });

    this.registerEventHandlers();
  }

  private componentDidUnload(): void {
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
  }

  private registerEventHandlers(): void {
    this.cy.on('tap', e => {
      if (this.clickDisabled) {
        this.clickDisabled = false;
        return;
      }

      if (e.target !== this.cy) {
        if (this.isNode(e.target.data())) {
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

  private isNode(data: NodeDataDefinition | EdgeDataDefinition): boolean {
    return !data.source && !data.target;
  }

  render() {
    return (
      <div class="ga-cytoscape"></div>
    );
  }
}
