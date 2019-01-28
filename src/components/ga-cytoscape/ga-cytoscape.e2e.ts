import { newE2EPage } from '@stencil/core/testing';

describe('ga-cytoscape', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ga-cytoscape></ga-cytoscape>');
    const element = await page.find('ga-cytoscape');
    expect(element).toHaveClass('hydrated');
  });
});
