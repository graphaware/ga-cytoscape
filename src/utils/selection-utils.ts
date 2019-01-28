import { Core } from "cytoscape";

export function makeEdgesNonselectable(cy: Core): void {
  cy.elements('edge').forEach(el => {
    el.unselectify();
  });
}
