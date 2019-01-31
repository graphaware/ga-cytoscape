import { Core, LayoutOptions, Layouts } from 'cytoscape';

export interface LayoutWithOptions {
  layout: Layouts;
  options: LayoutOptions;
}

/**
 * Handles changing of layouts, which are applied in sequence.
 * @param cy {Core} Cytoscape core instance.
 * @param currentBatch {LayoutWithOptions} Current batch of layouts (which may be still running).
 * @param newLayoutOptions {LayoutOptions | LayoutOptions[]} New layout options.
 * @returns {LayoutWithOptions} New batch of running layouts. Layout instance and it's config tuples.
 */
export function handleLayoutsChange(
  cy: Core,
  currentBatch: LayoutWithOptions[],
  newLayoutOptions: LayoutOptions | LayoutOptions[] | undefined,
): LayoutWithOptions[] {
  cy.stop(); // is this necessary?
  currentBatch.forEach(tuple => {
    tuple.layout.off('layoutstop');
    tuple.layout.stop();
  });

  if (!newLayoutOptions) {
    return [];
  }

  let layoutIndex = 0;
  const newLayouts = Array.isArray(newLayoutOptions)
    ? newLayoutOptions
    : [newLayoutOptions];
  const newBatch = newLayouts.map(options => ({
    layout: cy.layout(options),
    options,
  }));
  const runNextLayout = (index: number): void => {
    if (index < newBatch.length) {
      const tuple = newBatch[index];
      console.time(`${tuple.options.name}`);
      tuple.layout.run();
    }
  };

  newBatch.forEach(tuple => {
    tuple.layout.on('layoutstop', () => {
      console.timeEnd(`${tuple.options.name}`);
      runNextLayout(++layoutIndex);
    });
  });

  runNextLayout(0);

  return newBatch;
}
