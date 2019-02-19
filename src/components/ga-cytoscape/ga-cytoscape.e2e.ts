import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ga-cytoscape', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
        <div id="parent" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0">
          <ga-cytoscape></ga-cytoscape>
        </div>
      `,
    });
  });

  it('should render itself', async () => {
    const element = await page.find('ga-cytoscape');

    expect(element).not.toBeNull();
    expect(element).toHaveClass('hydrated');
  });

  it('should render canvas element', async () => {
    const element = await page.find('ga-cytoscape canvas');

    expect(element).not.toBeNull();
  });

  it('should render canvas element that precisely fits available parent space', async () => {
    const parentElement = await page.find('#parent');
    const canvasElement = await page.find('ga-cytoscape canvas');
    const parentStyle = await parentElement.getComputedStyle();
    const canvasStyle = await canvasElement.getComputedStyle();

    expect(parentStyle.width).toEqual(canvasStyle.width);
    expect(parentStyle.height).toEqual(canvasStyle.height);
  });
});
