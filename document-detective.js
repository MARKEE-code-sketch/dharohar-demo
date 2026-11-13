// Observations refer to visible features in the source scan, not inferred identities.
(() => {
  const $ = id => document.getElementById(id);
  const details = [
  [
    "The printed heading",
    "\"FORT WILLIAM\" is printed at the top of the document on the right. An ornamental panel surrounds the heading."
  ],
  [
    "Printed and handwritten text",
    "The document on the left combines printed text with handwritten entries."
  ],
  [
    "Pen strokes",
    "Long, looping pen strokes cross the lower part of the left-hand document."
  ],
  [
    "The decorative border",
    "An oval border surrounds the writing near the bottom of the document on the right. Compare its detailed design with the simpler layout of the document beside it."
  ]
];
  function showDetail(index) {
    $('document-number').textContent = String(index + 1).padStart(2, '0');
    $('document-detail-title').textContent = details[index][0];
    $('document-detail-copy').textContent = details[index][1];
    document.querySelectorAll('[data-detail]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.detail) === index));
  }
  document.querySelectorAll('[data-detail]').forEach(b => b.onclick = () => showDetail(Number(b.dataset.detail)));
  $('detective-zoom').onclick = () => {
    const zoomed = $('detective-canvas').classList.toggle('enlarged');
    $('detective-zoom').textContent = zoomed ? 'Fit image' : 'Enlarge to 180%';
  };
  showDetail(0);
})();
