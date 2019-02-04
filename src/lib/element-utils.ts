import { CollectionReturnValue, Core, ElementDefinition, ElementsDefinition } from 'cytoscape';

export function addNewGraph(
  cy: Core,
  elements: ElementsDefinition | ElementDefinition[] | undefined,
): CollectionReturnValue {
  // remove all previous elements
  cy.elements().remove();

  if (elements) {
    // flatten if defined as {nodes, edges}
    elements = normalizeElements(elements);
    return cy.add(elements as ElementDefinition[]);
  } else {
    return cy.collection();
  }
}

export function normalizeElements(elements: ElementsDefinition | ElementDefinition[]): ElementDefinition[] {
  const prenormalizedElements = elements as ElementsDefinition;

  if (!Array.isArray(elements) && prenormalizedElements.nodes || prenormalizedElements.edges) {
    return [...(prenormalizedElements.nodes || []), ...(prenormalizedElements.edges || [])];
  } else {
    return elements as ElementDefinition[];
  }
}
