import cytoscape, { Core, ElementsDefinition } from 'cytoscape';
import { addNewGraph, normalizeElements } from './element-utils';

describe('addNewGraph', () => {
  let cy: Core;

  beforeEach(() => {
    cy = cytoscape({
      elements: [
        { data: { id: 'n1' } },
        { data: { id: 'n2' } },
      ],
    });
  });

  afterEach(() => {
    cy.destroy();
  });

  it('should return empty collection and clear the graph when adding empty array', () => {
    const result = addNewGraph(cy, []);
    expect(result.length).toEqual(0);
    expect(cy.elements().length).toEqual(0);
  });

  it('should return elements added to graph and graph should contain only those', () => {
    const result = addNewGraph(cy, [
      { data: { id: 'n3' } },
    ]);
    expect(result.length).toEqual(1);
    expect(cy.$id('n3').id()).toEqual('n3');
  });
});

describe('normalizeElements', () => {
  it('should leave array of `ElementDefinition`s intact', () => {
    const elements = [
      { data: { id: 'n1' } },
      { data: { id: 'n2' } },
      { data: { source: 'n1', target: 'n2' } },
    ];
    const result = normalizeElements(elements);
    expect(result).toEqual(elements);
  });

  it('should normalize `ElementsDefinition` object into array', () => {
    const elements: ElementsDefinition = {
      nodes: [
        { data: { id: 'n1' } },
        { data: { id: 'n2' } },
      ],
      edges: [
        { data: { source: 'n1', target: 'n2' } },
      ],
    };
    const result = normalizeElements(elements);
    expect(result.length).toEqual(3);
  });
});
