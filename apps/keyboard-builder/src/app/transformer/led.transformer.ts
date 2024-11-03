import { KCFKey, KCFKeyboard } from '@keyboard-helper/keyboard-schema';
import { toMatrix } from './utils';

export function ledTransformer(keyboard: KCFKeyboard): KCFKeyboard {
  const transformedKeyboard = structuredClone(keyboard);

  const matrix = toMatrix(transformedKeyboard.layout);

  let ledIndex = 0;
  const direction = 0;

  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    if (rowIndex % 2 === direction) {
      // Even row: left to right
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        const key = matrix[rowIndex][colIndex];
        if (key) {
          key.led = ledIndex++;
        }
      }
    } else {
      for (let colIndex = cols - 1; colIndex >= 0; colIndex--) {
        const key = matrix[rowIndex][colIndex];
        if (key) {
          key.led = ledIndex++;
        }
      }
    }
  }

  return transformedKeyboard;
}
