export function getClickPath(el: HTMLElement) {
  const parent = el.parentElement;

  if (el.hasAttribute('aria-label')) {
    return '~~> ' + el.getAttribute('aria-label');
  }

  let elementDesc = el.tagName.toLocaleLowerCase();
  if (el.id) {
    elementDesc += '#' + el.id;
  } else if (el.classList && el.classList.length) {
    elementDesc += '.' + [].slice.apply(el.classList).join('.');
  }

  if (el && el.tagName.toLocaleLowerCase() === 'button') {
    const btnText = el.textContent;
    if (btnText) {
      elementDesc += '=' + btnText.trim();
    }
  }

  let path = [elementDesc];

  if (parent && parent.tagName.toLocaleLowerCase() === 'button') {
    const btnText = parent.textContent;
    if (btnText) {
      path = [btnText];
    }
  }

  while ((el = el.parentElement) && path.length < 3) {
    if (el.hasAttribute('aria-label')) {
      return '~~> ' + el.getAttribute('aria-label');
    }

    const tagName = el.tagName.toLocaleLowerCase();
    if (el.id) {
      path.push('#' + el.id);
    } else if (tagName.startsWith('cht-') && tagName !== 'cht-root') {
      path.push(tagName);
    }
  }

  return path.reverse().join(' > ');
}
