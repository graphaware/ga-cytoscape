![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# ga-cytoscape

**!!! Component still in development, not yet published to npm !!!**

ga-cytoscape is a a web component built with [Stencil](https://stenciljs.com) which lets you
easily integrate [Cytoscape.js](http://js.cytoscape.org/) graph theory (network) library for
visualisation and analysis into your web page, PWA or other.

## Using this component

### A) Script tag

- Put a script tag `<script async defer src='https://unpkg.com/ga-cytoscape@latest/dist/ga-cytoscape.js'></script>` in the head of your index.html

### B) Node modules
- Run `npm install ga-cytoscape --save`
- Put a script tag `<script async defer src='node_modules/ga-cytoscape/dist/mycomponent.js'></script>` in the head of your index.html


### C) Framework integration
- Run `npm install ga-cytoscape --save`
- See https://stenciljs.com/docs/overview

### In the template

After you made the element available by one of the ways described above, use it anywhere in
your template, JSX, HTML, etc. like this:
```
<ga-cytoscape></ga-cytoscape>
```

## Parameters

For detailed definition of most types see (or install) [@types/cytoscape](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts).

Attribute | Type | Default | Description
--------- | ---- | ------- | -----------
`elements` | `ElementsDefinition`, `ElementDefinition[]` | `undefined` | Definition of graph elements which should be rendered. Use for initial render. Any subsequent changes will clear the graph and render the new definition. For Incremental changed use one of the methods.
`layout` | `LayoutOptions`, `LayoutOptions[]` | <code>{&nbsp;name:&nbsp;'cose'&nbsp;}</code> | [Layout(s)](http://js.cytoscape.org/#layouts) to auto-run with supplied elements. If you provide an array, the component will run layouts one by one and wait for the end of each execution. When new layout(s) are supplied the previous batch will be terminated. The default is [cose layout](http://js.cytoscape.org/#layouts/cose).
`stylesheet` | `Stylesheet[]`, `Promise<Stylesheet[]>` | `undefined` | List of [stylesheets](http://js.cytoscape.org/#style) used to style the graph. For convenience, this option can alternatively be specified as a promise that resolves to the stylesheet(s).
`selected` | `ElementDefinition[]` | `undefined` | List of selected elements. You need to define at least <code>{&nbsp;data:&nbsp;{&nbsp;id:&nbsp;"your_id"&nbsp;}&nbsp;}</code> for each object in the array.
`plugins` | `Ext[]` | `[]` | List of Cytoscape [extensions](http://js.cytoscape.org/#extensions) you want to use in the component.
`pan` | `Position` | `undefined` | The initial panning position of the graph. Make sure to disable viewport manipulation options, such as fit, in your layout so that it is not overridden when the layout is applied.
`maxZoom` | `number` | `1e50` | A maximum bound on the zoom level of the graph. The viewport can not be scaled larger than this zoom level.
`minZoom` | `number` | `1e-50` | A minimum bound on the zoom level of the graph. The viewport can not be scaled smaller than this zoom level.
`zoom` | `number` | `1` | The initial zoom level of the graph.
`grabEnabled` | `boolean` | `true` | Allow grabbing nodes and moving them around.
`panEnabled` | `boolean` | `false` | Allow panning.
`selectableEdges` | `boolean` | `false` | Allow selecting edges.
`zoomEnabled` | `boolean` | `true` | Allow zooming.

## Methods (API)

## Events

Every event payload has `EventObject` type (see [@types/cytoscape](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts)) so event's target can be accessed in `event.detail.target`.

Event Name | Description
---------- | -----------
`nodeClicked` | Fires when user clicks/taps on a node.
`nodeMouseOver` | Fires when user moves his/her pointer over a node.
`nodeMouseOut` | Fires when user modes his/her pointer out of a node.
`edgeClicked` | Fires when user clicks/taps on an edge.
`edgeMouseOut` | Fires when user moves his/her pointer over an edge.
`edgeMouseOver` | Fires when user modes his/her pointer out of an edge.
`ctxmenu` | Fires when user right clicks (tries to open context menu). Get target node/edge from `e.detail.target.data()`. If `data` function is undefined, they clicked on canvas.
`selectionChanged` | Fired on Cytoscape's internal `select unselect` events. Get current selection with `e.detail.cy.elements(':selected')`.

## For devs

Run project:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Stencil docs are [here](https://stenciljs.com/docs/my-first-component).


