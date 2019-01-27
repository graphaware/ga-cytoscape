const cmp = document.querySelector('ga-cytoscape');
const dataSelect = document.querySelector('#dataSelect');

function fetchDataFile(name) {
  return fetch(`assets/data/${name}`).then(obj => obj.json());
}

async function applyDataFile(name) {
  cmp.elements = await fetchDataFile(name);
}

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
// cmp.addEventListener('nodeMouseOver', e => {
//   console.log('nodeMouseOver', e.detail);
// });
// cmp.addEventListener('edgeMouseOver', e => {
//   console.log('edgeMouseOver', e.detail);
// });
// cmp.addEventListener('nodeMouseOut', e => {
//   console.log('nodeMouseOut', e.detail);
// });
// cmp.addEventListener('edgeMouseOut', e => {
//   console.log('edgeMouseOut', e.detail);
// });
cmp.addEventListener('ctxmenu', e => {
  console.log('ctxmenu', e.detail.target.data());
});
