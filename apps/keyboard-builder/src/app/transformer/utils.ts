import { KCFKey } from '@keyboard-helper/keyboard-schema';

export function toMatrix(keys: KCFKey[]): (KCFKey | undefined)[][] {
  const { maxRow, maxCol } = getMatrixSize(keys);
  const matrix = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(undefined));

  console.log({ maxRow, maxCol });

  console.log(matrix);
  for (let i = 0, len = keys.length; i < len; i++) {
    const keyRow = keys[i].row;
    const keyCol = keys[i].col;
    if (keyRow !== undefined && keyCol !== undefined) {
      matrix[keyRow][keyCol] = keys[i];
    }
  }
  return matrix;
}

export function getMatrixSize(keys: KCFKey[]) {
  let minX = Infinity;
  let minY = Infinity;
  let minRow = Infinity;
  let minCol = Infinity;

  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxRow = -Infinity;
  let maxCol = -Infinity;

  for (const key of keys) {
    if (key.x < minX) {
      minX = key.x;
    }
    if (key.x > maxX) {
      maxX = key.x;
    }
    if (key.y < minY) {
      minY = key.y;
    }
    if (key.y > maxY) {
      maxY = key.y;
    }
    if (key.row) {
      if (key.row < minRow) {
        minRow = key.row;
      }
      if (key.row > maxRow) {
        maxRow = key.row;
      }
    }
    if (key.col) {
      if (key.col < minCol) {
        minCol = key.col;
      }
      if (key.col > maxCol) {
        maxCol = key.col;
      }
    }
  }
  return { minX, maxX, minY, maxY, minRow, maxRow, minCol, maxCol };
}
