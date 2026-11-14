// Six-piece archive puzzle. The image is rearranged only in the browser.
(() => {
  const isSolved = pieces => pieces.every((piece, index) => piece === index);
  function swap(pieces, first, second) {
    const next = [...pieces];
    [next[first], next[second]] = [next[second], next[first]];
    return next;
  }
  function shuffle() {
    let pieces = [0, 1, 2, 3, 4, 5];
    for (let i = pieces.length - 1; i > 0; i--) {
      pieces = swap(pieces, i, Math.floor(Math.random() * (i + 1)));
    }
    return isSolved(pieces) ? swap(pieces, 0, 1) : pieces;
  }
  globalThis.ArchivePuzzleLogic = {isSolved, swap, shuffle};
  if (typeof document === 'undefined') return;
  const $ = id => document.getElementById(id);
  const board = $('puzzle-board');
  if (!board) return;
  const puzzles = [
    {name:'Early debt instruments', image:'assets/early-debt.png', alt:'Two early debt instruments', copy:'This image shows two early debt instruments. Read about these records in the Formative Years article.', link:'https://mism.org/pointer/indian-stock-market-formative-years', action:'Read about the document'},
    {name:'Journey of the BSE', image:stories[3].image, alt:'Journey of the BSE article image from Dharohar', copy:'You have put together the image from Journey of the BSE. Find the article in the original Dharohar collection.', link:stories[3].url, action:'Find the BSE article'}
  ];
  const descriptions = ['top left', 'top centre', 'top right', 'bottom left', 'bottom centre', 'bottom right'];
  let activePuzzle = 0;
  let pieces = shuffle(), selected = null, moves = 0;
  const tiles = pieces.map((_, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'puzzle-tile';
    button.onclick = () => choose(index);
    board.append(button);
    return button;
  });
  function render() {
    const solved = isSolved(pieces);
    tiles.forEach((button, index) => {
      const piece = pieces[index];
      button.style.backgroundImage = `url("${puzzles[activePuzzle].image}")`;
      button.style.backgroundPosition = `${piece % 3 * 50}% ${Math.floor(piece / 3) * 100}%`;
      button.setAttribute('aria-label', `Position ${index + 1}: ${descriptions[piece]} image piece`);
      button.setAttribute('aria-pressed', String(selected === index));
      button.disabled = solved;
    });
    board.classList.toggle('puzzle-solved', solved);
    $('puzzle-moves').textContent = moves + (moves === 1 ? ' swap' : ' swaps');
    $('puzzle-complete').hidden = !solved;
  }
  function choose(index) {
    if (selected === null) {
      selected = index;
      $('puzzle-status').textContent = 'Piece selected. Choose another piece to swap, or select this one again to cancel.';
    } else if (selected === index) {
      selected = null;
      $('puzzle-status').textContent = 'Selection cleared. Choose two pieces to swap.';
    } else {
      pieces = swap(pieces, selected, index); selected = null; moves++;
      $('puzzle-status').textContent = isSolved(pieces) ? 'Puzzle complete. Explore the story behind this image.' : 'Pieces swapped. Keep matching the image details.';
    }
    render();
    if (isSolved(pieces)) $('puzzle-inspect').focus();
  }
  function restart() {
    pieces = shuffle(); selected = null; moves = 0;
    $('puzzle-preview').hidden = true;
    $('puzzle-peek').textContent = 'Show reference';
    $('puzzle-peek').setAttribute('aria-expanded', 'false');
    $('puzzle-status').textContent = 'A new arrangement is ready. Select two pieces to swap them.';
    render();
  }
  $('puzzle-shuffle').onclick = restart;
  function selectPuzzle(index) {
    activePuzzle = index;
    const puzzle = puzzles[index];
    $('puzzle-caption').textContent = puzzle.name + '. Six pieces to put together.';
    board.style.aspectRatio = '613 / 417';
    $('puzzle-preview').onload = () => {
      const preview = $('puzzle-preview');
      board.style.aspectRatio = `${preview.naturalWidth} / ${preview.naturalHeight}`;
    };
    $('puzzle-preview').src = puzzle.image;
    $('puzzle-preview').alt = puzzle.alt;
    $('puzzle-complete-copy').textContent = puzzle.copy;
    $('puzzle-inspect').href = puzzle.link;
    $('puzzle-inspect').textContent = puzzle.action;
    $('puzzle-inspect').target = '_blank';
    $('puzzle-inspect').rel = 'noopener';
    document.querySelectorAll('[data-puzzle]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.puzzle) === index)));
    restart();
  }
  document.querySelectorAll('[data-puzzle]').forEach(button => button.onclick = () => selectPuzzle(Number(button.dataset.puzzle)));
  $('puzzle-peek').setAttribute('aria-controls', 'puzzle-preview');
  $('puzzle-peek').setAttribute('aria-expanded', 'false');
  $('puzzle-peek').onclick = () => {
    const show = $('puzzle-preview').hidden;
    $('puzzle-preview').hidden = !show;
    $('puzzle-peek').textContent = show ? 'Hide reference' : 'Show reference';
    $('puzzle-peek').setAttribute('aria-expanded', String(show));
  };
  selectPuzzle(0);
})();
