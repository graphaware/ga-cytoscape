function fetchDataFile(name) {
  return fetch(`assets/data/${name}`).then(obj => obj.json());
}

function applyLayout(name) {
  const layouts = name.split(',');
  cmp.layout = layouts.map(name => ({name}));
}

async function applyDataFile(name) {
  cmp.elements = await fetchDataFile(name);
}

const cmp = document.querySelector('ga-cytoscape');
const layoutSelect = document.querySelector('#layoutSelect');
const dataSelect = document.querySelector('#dataSelect');

// pass data into component
applyDataFile(dataSelect.value);
// set cytoscape plugins
cmp.plugins = [cytoscapeCola, cytoscapeCoseBilkent];
cmp.selected = [{ data: { id: "0" } }, { data: { id: "1" } }];
cmp.grabEnabled = true;

// demo selector listeners
layoutSelect.addEventListener('change', () => {
  applyLayout(layoutSelect.value);
});
dataSelect.addEventListener('change', () => {
  applyDataFile(dataSelect.value);
});

// component listeners
cmp.addEventListener('nodeClicked', e => {
  console.log('nodeClicked', e.detail.target.data());
});
cmp.addEventListener('edgeClicked', e => {
  console.log('edgeClicked', e.detail.target.data());
});
// cmp.addEventListener('nodeMouseOver', e => {
//   console.log('nodeMouseOver', e.detail.target.data());
// });
// cmp.addEventListener('edgeMouseOver', e => {
//   console.log('edgeMouseOver', e.detail.target.data());
// });
cmp.addEventListener('ctxmenu', e => {
  console.log('ctxmenu', e.detail.target.data ? e.detail.target.data() : 'canvas');
});
cmp.addEventListener('selectionChanged', e => {
  console.log('selectionChanged', e.detail.cy.elements(':selected').jsons());
});
