import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postCSSnested from 'postcss-nested';

export const config: Config = {
  namespace: 'gacytoscape', // 'ga-cytoscape' does not work because of a bug in Stencil One
  outputTargets:[
    { type: 'dist' },
    { type: 'docs-readme' },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    postcss({
      plugins: [
        postCSSnested(),
        autoprefixer(),
      ],
    }),
  ],
};
