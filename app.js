/* The data file remains separate so an archive row can be added without editing the interface. */
const entries = window.DN_ARCHIVE;
const body = document.getElementById('archive-body');
const dialog = document.getElementById('script-dialog');
const closeButton = document.getElementById('dialog-close');
let previousFocus = null;

function cell(value, className = '') {
  const td = document.createElement('td');
  td.textContent = value;
  if (className) td.className = className;
  return td;
}

function openScript(entry) {
  previousFocus = document.activeElement;
  document.getElementById('dialog-index').textContent = `ARCHIVE ${String(entry.index).padStart(2, '0')} · SCRIPT`;
  document.getElementById('dialog-title').textContent = entry.title;
  document.getElementById('dialog-subtitle').textContent = `${entry.author} · ${entry.category} · 자연 청자 ${entry.addressee} (극의 배역 物)`;
  const content = document.getElementById('script-content');
  content.replaceChildren();
  for (const [speaker, line] of entry.script) {
    const row = document.createElement('div');
    row.className = speaker ? 'script-row' : 'script-row script-stage';
    if (speaker) {
      const name = document.createElement('span');
      name.className = 'script-speaker';
      name.textContent = speaker;
      row.append(name);
    }
    const text = document.createElement('span');
    text.textContent = line;
    row.append(text);
    content.append(row);
  }
  dialog.showModal();
  closeButton.focus();
}

for (const entry of entries) {
  const row = document.createElement('tr');
  row.append(cell(String(entry.index).padStart(2, '0'), 'index'));
  row.append(cell(entry.title, 'work-title'));
  row.append(cell(entry.original, 'original'));
  row.append(cell(entry.modern, 'modern'));
  row.append(cell(entry.author));
  row.append(cell(entry.source, 'source'));
  row.append(cell(entry.period));

  const addressee = cell(entry.addressee, 'addressee');
  const roleName = document.createElement('small');
  roleName.textContent = '극의 배역 物';
  addressee.append(roleName);
  row.append(addressee);

  const attitude = cell(entry.attitude);
  const category = document.createElement('span');
  category.className = 'category';
  category.textContent = entry.category;
  attitude.prepend(category, document.createElement('br'));
  row.append(attitude);
  row.append(cell(entry.role));

  const action = document.createElement('td');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'script-button';
  button.innerHTML = '대본 보기 <span aria-hidden="true">↗</span>';
  button.setAttribute('aria-label', `${entry.title} 대본 보기`);
  button.addEventListener('click', () => openScript(entry));
  action.append(button);
  row.append(action);
  body.append(row);
}

document.getElementById('entry-count').textContent = String(entries.length).padStart(2, '0');
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
