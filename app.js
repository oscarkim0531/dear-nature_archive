const dialog = document.getElementById('script-dialog');
const closeButton = document.getElementById('dialog-close');
let previousFocus = null;

document.querySelectorAll('[data-script-id]').forEach((button) => {
  button.addEventListener('click', () => {
    const template = document.getElementById(button.dataset.scriptId);
    if (!template) return;

    previousFocus = document.activeElement;
    document.getElementById('dialog-index').textContent = button.dataset.dialogIndex;
    document.getElementById('dialog-title').textContent = button.dataset.dialogTitle;
    document.getElementById('dialog-subtitle').textContent = button.dataset.dialogSubtitle;
    document.getElementById('script-content').replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    closeButton.focus();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => previousFocus?.focus());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
