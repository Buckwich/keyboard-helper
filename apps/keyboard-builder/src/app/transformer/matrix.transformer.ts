import { KCFKey, KCFKeyboard } from '@keyboard-helper/keyboard-schema';

export function matrixTransformer(keyboard: KCFKeyboard): KCFKeyboard {
  const transformedKeyboard = structuredClone(keyboard);

  estimateWiring(transformedKeyboard.layout);
  // removeEmptys(transformedKeyboard.layout);
  printMatrix(transformedKeyboard.layout);
  //   transformedKeyboard.layout.forEach((key) => {
  //     key.x = Math.floor(key.x);
  //     key.y = Math.floor(key.y);
  //     key.labels = {
  //       tr: {
  //         text: Math.floor(key.x).toString(),
  //       },
  //       mc: {
  //         text: key.labels.tl?.text || '',
  //       },
  //       tl: {
  //         text: Math.floor(key.y).toString(),
  //       },
  //     };
  //   });

  return transformedKeyboard;
}

function estimateWiring(keys: KCFKey[]) {
  // Extremely naive but effective solution.
  let minRow = Number.MAX_VALUE;
  let minCol = Number.MAX_VALUE;

  let _rows = 1;
  let _cols = 1;
  for (const key of keys) {
    // Calculate an estimated row and column.
    const row = Math.floor(key.y);
    const col = Math.floor(key.x);

    key.row = row;
    key.col = col;

    minRow = Math.min(row, minRow);
    minCol = Math.min(col, minCol);
    _rows = Math.max(row + 1, _rows);
    _cols = Math.max(col + 1, _cols);
  }

  for (const key of keys) {
    key.row = (key.row || 0) - minRow;
    key.col = (key.col || 0) - minCol;
  }
  _rows -= minRow;
  _cols -= minCol;
}

function removeEmptys(keys: KCFKey[]) {
  const rows = new Map<number, KCFKey[]>();
  const cols = new Map<number, KCFKey[]>();
  keys.forEach((key) => {
    if (key.row !== undefined) rows.set(key.row, (rows.get(key.row) ? rows.get(key.row) : [])?.concat([key]) || []);
    if (key.col !== undefined) cols.set(key.col, (cols.get(key.col) ? cols.get(key.col) : [])?.concat([key]) || []);
  });
  Array.from(rows.values()).forEach((row, rowNumber) => {
    row.forEach((key) => {
      key.row = rowNumber;
    });
  });

  Array.from(cols.values()).forEach((col, colNumber) => {
    col.forEach((key) => {
      key.col = colNumber;
    });
  });
}

function printMatrix(keys: KCFKey[]) {
  keys.forEach(
    (key) =>
      (key.labels = {
        tl: {
          text: key.row?.toString() || '0',
        },

        tr: {
          text: key.col?.toString() || '0',
        },
      })
  );
}

function roundToTwo(num: number | undefined) {
  if (num === undefined || num === null) {
    return '';
  }
  return (+(Math.round((num + 'e+2') as any) + 'e-2')).toString();
}
