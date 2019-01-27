import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import postCSSnested from 'postcss-nested';

export const config: Config = {
  namespace: 'ga-cytoscape',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    postcss({
      plugins: [
        postCSSnested(),
        autoprefixer({
          browsers: ['last 2 Chrome versions'],
        }),
      ],
    }),
  ],
};
