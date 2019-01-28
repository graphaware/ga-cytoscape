import { CollectionReturnValue, Core, ElementDefinition, ElementsDefinition } from "cytoscape";

export function addNewGraph(
  cy: Core,
  elements: ElementsDefinition | ElementDefinition[] | undefined,
): CollectionReturnValue | undefined {
  // remove all previous elements
  cy.elements().remove();

  if (elements) {
    // flatten if defined as {nodes, edges}
    const _elements = elements as ElementsDefinition;
    if (_elements.nodes && _elements.nodes) {
      elements = [..._elements.nodes, ..._elements.edges];
    }
    return cy.add(elements as ElementDefinition[]);
  }

  return undefined;
}
