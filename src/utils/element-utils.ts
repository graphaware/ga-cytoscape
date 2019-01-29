import { CollectionReturnValue, Core, ElementDefinition, ElementsDefinition } from "cytoscape";

export function addNewGraph(
  cy: Core,
  elements: ElementsDefinition | ElementDefinition[] | undefined,
): CollectionReturnValue | undefined {
  // remove all previous elements
  cy.elements().remove();

  if (elements) {
    // flatten if defined as {nodes, edges}
    const prenormalizedElements = elements as ElementsDefinition;
    if (prenormalizedElements.nodes || prenormalizedElements.edges) {
      elements = normalizeElements(prenormalizedElements);
    }
    return cy.add(elements as ElementDefinition[]);
  }

  return undefined;
}

export function normalizeElements(elements: ElementsDefinition): ElementDefinition[] {
  return [...(elements.nodes || []), ...(elements.edges || [])];
}
