import { Core } from 'cytoscape';

export function makeEdgesNonselectable(cy: Core): void {
  cy.edges().forEach(el => {
    el.unselectify();
  });
}
