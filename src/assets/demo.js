const cmp = document.querySelector('ga-cytoscape');
const layoutSelect = document.querySelector('#layoutSelect');
const dataSelect = document.querySelector('#dataSelect');

function fetchDataFile(name) {
  return fetch(`assets/data/${name}`).then(obj => obj.json());
}

async function applyDataFile(name) {
  cmp.elements = await fetchDataFile(name);
}

function applyLayout(name) {
  const layouts = name.split(',');
  cmp.layout = layouts.map(name => ({name}));
}

layoutSelect.addEventListener('change', () => {
  applyLayout(layoutSelect.value);
});
dataSelect.addEventListener('change', () => {
  applyDataFile(dataSelect.value);
});

applyDataFile(dataSelect.value);

cmp.addEventListener('nodeClicked', e => {
  console.log('nodeClicked', e.detail.target.data());
});
cmp.addEventListener('edgeClicked', e => {
  console.log('edgeClicked', e.detail.target.data());
});
cmp.addEventListener('nodeMouseOver', e => {
  console.log('nodeMouseOver', e.detail.target.data());
});
cmp.addEventListener('edgeMouseOver', e => {
  console.log('edgeMouseOver', e.detail.target.data());
});
cmp.addEventListener('ctxmenu', e => {
  console.log('ctxmenu', e.detail.target.data ? e.detail.target.data() : 'canvas');
});
