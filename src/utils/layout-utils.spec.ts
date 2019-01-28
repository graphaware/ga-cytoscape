import { handleLayoutsChange } from './layout-utils';
import cytoscape, { Core } from "cytoscape";

describe('handleLayoutsChange', () => {
  let cy: Core;

  beforeEach(() => {
    cy = cytoscape();
  });

  afterEach(() => {
    cy.destroy();
  });

  it('returns array with one item when one layout options are supplied', () => {
    const newBatch = handleLayoutsChange(cy, [], { name: 'random' });
    expect(newBatch.length).toEqual(1);
  });

  it('returns array with two items when two layout options are supplied', () => {
    const newBatch = handleLayoutsChange(cy, [], [{ name: 'random' }, { name: 'grid' }]);
    expect(newBatch.length).toEqual(2);
  });
});
