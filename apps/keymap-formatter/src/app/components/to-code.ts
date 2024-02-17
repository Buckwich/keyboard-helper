import { KCFKey } from '@keyboard-helper/keyboard-schema';

const u = 8;

export function toCode(keys: KCFKey[]): string {
  const { keys: newKeys, userKeys } = limitSize(keys);

  keys = newKeys;

  const expected = keys.map((key) => key.labels.mc?.text || '').join(',');
  const size = getSize(keys);

  const codeRows = Array.from({ length: size.uHeight }, () => Array.from({ length: size.uWidth * u }, () => ' '));

  keys.forEach(({ x, y, w, labels }) => {
    const newText = pad(labels.mc?.text || '', w * u) + ',';
    codeRows[y].splice(x * u, newText.length, ...newText.split(''));
  });

  let code = codeRows.map((row) => row.join('')).join('\n');

  const position = code.lastIndexOf(',');

  if (position !== -1) {
    code = code.substring(0, position) + ' ' + code.substring(position + 1);
  }

  const isCodeValid = deepTrim(expected) === deepTrim(code);

  if (!isCodeValid) {
    console.log('Invalid code');
  }

  return code;
}

export function toComment(keys: KCFKey[]): string {
  const { keys: newKeys, userKeys } = limitSize(keys);
  console.log({ userKeys });

  keys = newKeys;

  const size = getSize(keys);

  // initialize empty array with spaces (height: rows, width: columns * u)
  const codeRows = Array.from({ length: size.uHeight }, () => Array.from({ length: size.uWidth * u }, () => ' '));

  // add placeholder text to calculate edges
  keys.forEach(({ x, y, w, labels }) => {
    const newText = 'X'.repeat(w * u - 1) + '│';
    codeRows[y].splice(x * u, newText.length, ...newText.split(''));
  });

  // convert each helper row to string
  const codeRowStrings = codeRows.map((row) => (' ' + row.join('')).replace(/\sX/gm, '│X'));

  // add empty rows to the start and end of the array to calculate borders inbetween
  codeRowStrings.unshift('');
  codeRowStrings.push('');

  // add borders to the array; omitting last empty row
  const codeRowsWithBorders: string[] = [];
  for (let i = 0; i < codeRowStrings.length - 1; i++) {
    codeRowsWithBorders.push(codeRowStrings[i], getBorder(codeRowStrings[i], codeRowStrings[i + 1]));
  }

  // add text to the middle of the borders
  keys.forEach(({ x, y, w, labels }) => {
    const row = y * 2 + 2;
    const newText = pad(labels.mc?.text || '', w * u);

    const intermediate = codeRowsWithBorders[row].split('');
    intermediate.splice(x * u + 1, newText.length, ...newText.split(''));
    codeRowsWithBorders[row] = intermediate.join('');
  });

  return codeRowsWithBorders.join('\n');
}

function getBorder(rowAbove: string, rowBelow: string) {
  let border = '';
  //adding 1 space to the start and end of the row to make it easier to compare with
  const above = ' ' + rowAbove + ' ';
  const below = ' ' + rowBelow + ' ';
  for (let i = 1; i < Math.max(above.length, below.length) - 1; i++) {
    const top = above[i] === '│';
    const bottom = below[i] === '│';
    const left = below[i - 1] === 'X' || above[i - 1] === 'X' || below[i - 1] === '│' || above[i - 1] === '│';
    const right = below[i + 1] === 'X' || above[i + 1] === 'X' || below[i + 1] === '│' || above[i + 1] === '│';

    border += getSymbol(top, bottom, left, right);
  }
  return border;
}

function getSymbol(t: boolean, b: boolean, l: boolean, r: boolean) {
  if (t && b && l && r) {
    return '┼';
  }
  if (t && b && l) {
    return '┤';
  }
  if (t && b && r) {
    return '├';
  }
  if (t && l && r) {
    return '┴';
  }
  if (b && l && r) {
    return '┬';
  }
  if (t && l) {
    return '┘';
  }
  if (t && r) {
    return '└';
  }
  if (b && l) {
    return '┐';
  }
  if (b && r) {
    return '┌';
  }

  if (l && r) {
    return '─';
  }

  if (t || b) {
    return 'A';
  }

  return ' ';
}

function deepTrim(input: string): string {
  return input.replace(/\s+/g, '').trim();
}

function getSize(keys: KCFKey[]) {
  const uSize = keys.reduce(
    ({ uWidth, uHeight }, { x, w, y, h }) => ({
      uWidth: Math.max(uWidth, x + w),
      uHeight: Math.max(uHeight, y + h),
    }),
    { uWidth: 0, uHeight: 0 }
  );
  return uSize;
}

function pad(input: string, length: number) {
  const paddingLength = length - input.length;
  const leftPadding = Math.floor(paddingLength / 2);
  const rightPadding = Math.ceil(paddingLength / 2);
  const paddedText = ' '.repeat(leftPadding) + input + ' '.repeat(rightPadding - 1);
  return paddedText;
}

function limitSize(keys: KCFKey[]) {
  let userI = 0;
  const userKeys: { label: string; code: string; alias: string }[] = [];
  return {
    userKeys,
    keys: keys.map((key) => {
      const newKey = { ...key };
      let text = newKey.labels.mc?.text || '';
      if (text.length > u - 1) {
        userKeys.push({ label: `U ${userI}`, code: text, alias: `USER_${userI}` });
        text = `USER_${userI}`;
        userI++;
      }
      newKey.labels.mc = { ...newKey.labels.mc, text: text };
      return newKey;
    }),
  };
}
